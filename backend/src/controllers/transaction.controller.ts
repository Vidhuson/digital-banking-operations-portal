import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";
import { DepositDto, FundTransferDto, SearchTransactionDto, WithdrawDto } from "../dtos/transaction.dto";
import { TransactionMode, TransactionStatus, TransactionType } from "@prisma/client";

export class TransactionController {
    private transactionService = new TransactionService();

    deposit = async (req: Request, res: Response) => {
        const depositData: DepositDto = req.body;
        const response = await this.transactionService.deposit(depositData);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "Amount deposited successfully.",
            response
        )
    }

    withdraw = async (req: Request, res: Response) => {
        const withdrawData: WithdrawDto = req.body;
        const response = await this.transactionService.withdraw(withdrawData);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "Amount withdrawn successfully.",
            response
        )
    }

    fundTransfer = async (req: Request, res: Response) => {
        const fundTransferData: FundTransferDto = req.body;
        const response = await this.transactionService.fundTransfer(fundTransferData);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "Fund transfer completed successfully.",
            response
        )
    }

    searchTransactions = async (req: Request,res: Response) => {

        const {
            transactionReference,
            accountNumber,
            transactionType,
            transactionMode,
            status
        } = req.query;

        const filters: SearchTransactionDto = {
            transactionReference: transactionReference as string,
            accountNumber:accountNumber as string,
            transactionType:transactionType as TransactionType,
            transactionMode:transactionMode as TransactionMode,
            status:status as TransactionStatus
        };

        const response = await this.transactionService.searchTransactions(filters);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Transactions retrieved successfully.",
            response
        );
    };
}