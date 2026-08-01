import { Request, Response } from "express";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";
import { StatementService } from "../services/statement.service";

export class StatementController {

    private readonly statementService = new StatementService();

    getStatement = async (
        req: Request,
        res: Response
    ) => {

        const {
            accountNumber,
            fromDate,
            toDate,
            page = "1",
            limit = "10"
        } = req.query;

        const response =
            await this.statementService.getStatement(
                accountNumber as string,
                new Date(fromDate as string),
                new Date(toDate as string),
                Number(page),
                Number(limit)
            );

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Statement retrieved successfully.",
            response
        );
    };
}