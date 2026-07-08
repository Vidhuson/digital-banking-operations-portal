import { AccountStatus, Prisma, TransactionChannel, TransactionMode, TransactionStatus, TransactionType } from "@prisma/client";
import { CreateTransactionRepositoryDto, DepositDto } from "../dtos/transaction.dto";
import { AccountRepository } from "../repositories/account.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";
import { prisma } from "../config/prisma";
import { TransactionRepository } from "../repositories/transaction.repository";

export class TransactionService {
    private accountRepository = new AccountRepository();
    private transactionRepository = new TransactionRepository();

    deposit = async (depositData: DepositDto) => {
        
        const {
            accountNumber,
            amount,
            transactionChannel,
            remarks
        } = depositData;

        // Validate Amount
        if (amount <= 0)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Deposit amount must be greater than zero.");

        // Get Account
        const account = await this.accountRepository.getAccountByAccountNumber(accountNumber);

        if (!account)
            throw new ApiError(HttpStatus.NOT_FOUND, "Account not found.");

        // Validate Account Status
        if (account.status != AccountStatus.ACTIVE)
            throw new ApiError(HttpStatus.BAD_REQUEST, "Account is not active.");

        // Balance Calculation
        const openingBalance = account.balance;

        const depositAmount = new Prisma.Decimal(amount);

        const closingBalance = openingBalance.plus(depositAmount);

        const transactionReference = `TXN${Date.now()}`;

        //Repository DTO
        const transactionRepositoryData: CreateTransactionRepositoryDto = {
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

        // Database Transaction
        await prisma.$transaction(async (tx) => {

            await this.accountRepository.updateAccount(
                account.id,
                { balance: closingBalance },
                tx
            );

            await this.transactionRepository.createTransaction(
                transactionRepositoryData,
                tx
            );
        });

        return {
            transactionReference,
            accountNumber: account.accountNumber,
            depositedAmount: depositAmount,
            availableBalance: closingBalance
        };
    }
}