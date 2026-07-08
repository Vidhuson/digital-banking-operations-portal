import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";
import { DepositDto } from "../dtos/transaction.dto";

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
}