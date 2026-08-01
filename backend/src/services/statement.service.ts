import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";

import { CustomerRepository } from "../repositories/customer.repository";
import { StatementRepository } from "../repositories/statement.repository";

import { TransactionType } from "@prisma/client";
import { StatementResponseDto } from "../dtos/statement.dto";
import { RequestContext } from "../context/request-context";

export class StatementService {

    private readonly statementRepository = new StatementRepository();
    private readonly customerRepository = new CustomerRepository();

    getStatement = async (
        accountNumber: string,
        fromDate: Date,
        toDate: Date,
        page: number,
        limit: number
    ): Promise<StatementResponseDto> => {
        const currentUser = RequestContext.getCurrentUser();

        if (!currentUser)
            throw new ApiError(
                HttpStatus.UNAUTHORIZED,
                "Current user not found."
            );

        const customer = await this.customerRepository.getMyProfile(
            currentUser.userNumber
        );

        if (!customer) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );
        }

        const statement =
            await this.statementRepository.getStatement(
                customer.id,
                accountNumber,
                fromDate,
                toDate,
                page,
                limit

            );

        if (!statement) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Account not found."
            );
        }

        const transactions = statement.transactions;

        const openingBalance =
            transactions.length > 0
                ? Number(transactions[0].openingBalance)
                : 0;

        const closingBalance =
            transactions.length > 0
                ? Number(transactions[transactions.length - 1].closingBalance)
                : Number(statement.account.balance);

        const totalCredits = transactions
            .filter(
                transaction =>
                    transaction.transactionType === TransactionType.DEPOSIT
            )
            .reduce(
                (sum, transaction) => sum + Number(transaction.amount),
                0
            );

        const totalDebits = transactions
            .filter(
                transaction =>
                    transaction.transactionType === TransactionType.WITHDRAW ||
                    transaction.transactionType === TransactionType.FUND_TRANSFER
            )
            .reduce(
                (sum, transaction) => sum + Number(transaction.amount),
                0
            );
        const response: StatementResponseDto = {
            account: {
                accountNumber: statement.account.accountNumber,
                accountType: statement.account.accountType,
                branchName: statement.account.branchName,
                balance: Number(statement.account.balance),
                currency: statement.account.currency
            },

            summary: {
                openingBalance,
                closingBalance,
                totalCredits,
                totalDebits,
                transactionCount: transactions.length
            },

            transactions: transactions.map(transaction => ({
                transactionReference:
                    transaction.transactionReference,
                transactionType:
                    transaction.transactionType,
                transactionMode:
                    transaction.transactionMode,
                amount:
                    Number(transaction.amount),
                status:
                    transaction.status,
                remarks:
                    transaction.remarks,
                createdAt:
                    transaction.createdAt
            }))
        };

        return response;
    };
}