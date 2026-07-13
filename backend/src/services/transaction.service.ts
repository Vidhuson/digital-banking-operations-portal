import { AccountStatus, Prisma, TransactionChannel, TransactionMode, TransactionStatus, TransactionType } from "@prisma/client";
import { CreateTransactionRepositoryDto, DepositDto, FundTransferDto, WithdrawDto } from "../dtos/transaction.dto";
import { AccountRepository } from "../repositories/account.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { prisma } from "../config/prisma";
import { TransactionRepository } from "../repositories/transaction.repository";
import { ReferenceGenerator } from "../utils/reference-generator";

export class TransactionService {
    private accountRepository = new AccountRepository();
    private transactionRepository = new TransactionRepository();

    private getValidatedAccount = async (accountNumber: string) => {
        const account = await this.accountRepository.getAccountByAccountNumber(accountNumber);

        if (!account)
            throw new ApiError(HttpStatus.NOT_FOUND, "Account not found.");

        // Validate Account Status
        if (account.status !== AccountStatus.ACTIVE)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Account is not active.");

        return account;
    }

    deposit = async (depositData: DepositDto) => {

        const {
            accountNumber,
            amount,
            transactionChannel,
            remarks
        } = depositData;

        //Validate Request
        if (amount <= 0)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Deposit amount must be greater than zero.");

        //Retrieve Account
        const account = await this.getValidatedAccount(accountNumber);

        // Calculate Balance 
        const openingBalance = account.balance;
        const depositAmount = new Prisma.Decimal(amount);
        const closingBalance = openingBalance.plus(depositAmount);

        // Prepare Transaction
        const transactionReference = ReferenceGenerator.generateTransactionReference();

        const creditTransactionData: CreateTransactionRepositoryDto = {
            transactionReference: transactionReference,
            accountId: account.id,
            accountNumber: accountNumber,
            transactionType: TransactionType.DEPOSIT,
            transactionMode: TransactionMode.CREDIT,
            transactionChannel: transactionChannel,
            amount: depositAmount,
            openingBalance: openingBalance,
            closingBalance: closingBalance,
            status: TransactionStatus.SUCCESS,
            remarks: remarks
        }

        //Execute Database Transaction
        await prisma.$transaction(async (tx) => {

            await this.accountRepository.updateAccount(
                account.id,
                { balance: closingBalance },
                tx
            );

            await this.transactionRepository.createTransaction(
                creditTransactionData,
                tx
            );
        });

        //Return Response
        return {
            transactionReference,
            accountNumber: account.accountNumber,
            depositedAmount: depositAmount,
            availableBalance: closingBalance
        };
    }

    withdraw = async (withdrawData: WithdrawDto) => {

        const {
            accountNumber,
            amount,
            transactionChannel,
            remarks
        } = withdrawData;


//Validate Request        
        if (amount <= 0)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Withdrawal amount must be greater than zero.");

        //Retrieve Account
        const account = await this.getValidatedAccount(accountNumber);

        // Calculate Balance
        const openingBalance = account.balance;
        const withdrawAmount = new Prisma.Decimal(amount);
        if (openingBalance.lessThan(withdrawAmount))
            throw new ApiError(HttpStatus.BAD_REQUEST, "Insufficient account balance")
        const closingBalance = openingBalance.minus(withdrawAmount);

        const transactionReference = ReferenceGenerator.generateTransactionReference();

        const debitTransactionData: CreateTransactionRepositoryDto = {
            transactionReference: transactionReference,
            accountId: account.id,
            accountNumber: accountNumber,
            transactionType: TransactionType.WITHDRAW,
            transactionMode: TransactionMode.DEBIT,
            transactionChannel: transactionChannel,
            amount: withdrawAmount,
            openingBalance: openingBalance,
            closingBalance: closingBalance,
            status: TransactionStatus.SUCCESS,
            remarks: remarks
        }

        //Execute Database Transaction
        await prisma.$transaction(async (tx) => {

            await this.accountRepository.updateAccount(
                account.id,
                { balance: closingBalance },
                tx
            );

            await this.transactionRepository.createTransaction(
                debitTransactionData,
                tx
            );
        });

        // return reponse
        return {
            transactionReference,
            accountNumber: account.accountNumber,
            withdrawnAmount: withdrawAmount,
            availableBalance: closingBalance
        };
    }

    fundTransfer = async (fundTransferData: FundTransferDto) => {

        const {
            fromAccountNumber,
            toAccountNumber,
            amount,
            transactionChannel,
            remarks
        } = fundTransferData;

        if (amount <= 0)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Transfer amount must be greater than zero.");

        //Retrieve Account 
        if (fromAccountNumber === toAccountNumber)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Sender and receiver accounts cannot be the same.");

        const senderAccount = await this.getValidatedAccount(fromAccountNumber);
        const receiverAccount = await this.getValidatedAccount(toAccountNumber);

        // Calculate Balance
        const transferAmount = new Prisma.Decimal(amount);
        const senderOpeningBalance = senderAccount.balance;
        const receiverOpeningBalance = receiverAccount.balance;

        if (senderOpeningBalance.lessThan(transferAmount))
            throw new ApiError(HttpStatus.BAD_REQUEST, "Insufficient account balance")

        const senderClosingBalance = senderOpeningBalance.minus(transferAmount);
        const receiverClosingBalance = receiverOpeningBalance.plus(transferAmount);

        // Prepare Transaction
        const fundTransferReference = ReferenceGenerator.generateFundTransferReference();
        const debitTransactionReference = ReferenceGenerator.generateTransactionReference();
        const creditTransactionReference = ReferenceGenerator.generateTransactionReference();

        const debitTransactionData: CreateTransactionRepositoryDto = {
            transactionReference: debitTransactionReference,
            sourceReference: fundTransferReference,
            accountId: senderAccount.id,
            accountNumber: senderAccount.accountNumber,
            counterpartyAccountNumber: receiverAccount.accountNumber,
            transactionType: TransactionType.FUND_TRANSFER,
            transactionMode: TransactionMode.DEBIT,
            transactionChannel,
            amount: transferAmount,
            openingBalance: senderOpeningBalance,
            closingBalance: senderClosingBalance,
            status: TransactionStatus.SUCCESS,
            remarks
        };

        const creditTransactionData: CreateTransactionRepositoryDto = {
            transactionReference: creditTransactionReference,
            sourceReference: fundTransferReference,
            accountId: receiverAccount.id,
            accountNumber: receiverAccount.accountNumber,
            counterpartyAccountNumber: senderAccount.accountNumber,
            transactionType: TransactionType.FUND_TRANSFER,
            transactionMode: TransactionMode.CREDIT,
            transactionChannel,
            amount: transferAmount,
            openingBalance: receiverOpeningBalance,
            closingBalance: receiverClosingBalance,
            status: TransactionStatus.SUCCESS,
            remarks
        };

        //Execute Database Transaction
        await prisma.$transaction(async (tx) => {

            // 1. Update sender account balance
            await this.accountRepository.updateAccount(
                senderAccount.id,
                { balance: senderClosingBalance },
                tx
            );

            // 2. Update receiver account balance
            await this.accountRepository.updateAccount(
                receiverAccount.id,
                { balance: receiverClosingBalance },
                tx
            );

            // 3. Create debit transaction

            await this.transactionRepository.createTransaction(
                debitTransactionData,
                tx
            );

            // 4. Create credit transaction

            await this.transactionRepository.createTransaction(
                creditTransactionData,
                tx
            );

        });

        //return response
        return {
            fundTransferReference,
            fromAccountNumber: senderAccount.accountNumber,
            toAccountNumber: receiverAccount.accountNumber,
            transferredAmount: transferAmount,
            senderAvailableBalance: senderClosingBalance,
            receiverAvailableBalance: receiverClosingBalance
        }
    };
}