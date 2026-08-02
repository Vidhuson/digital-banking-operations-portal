import { Request, Response } from "express";
import { AccountService } from "../services/account.service";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export class AccountController {
    private accountService = new AccountService();

    createAccount = async (req: Request, res: Response) => {
        const account = await this.accountService.createAccount(req.body);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "Account created successfully",
            account
        )
    }

    getAccounts = async (_req: Request, res: Response) => {
        const accounts = await this.accountService.getAccounts();
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Account fetched successfully",
            accounts
        )
    }

    getAccountById = async (req: Request, res: Response) => {
        const id = req.params.id as string
        const accountDetails = await this.accountService.getAccountById(id);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Account fetched successfully",
            accountDetails
        )
    }

    getAccountByAccountNumber = async (req: Request, res: Response) => {
        const accountNumber = req.params.accountNumber as string
        const accountDetails = await this.accountService.getAccountByAccountNumber(accountNumber);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Account fetched successfully",
            accountDetails
        )
    }

    updateAccount = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const body = req.body
        const updatedAccount = await this.accountService.updateAccount(id, body);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Account updated successfully",
            updatedAccount
        )
    }

    deleteAccount = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const deletedaccount = await this.accountService.deleteAccount(id);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Account deleted successfully",
            deletedaccount
        )
    }
}