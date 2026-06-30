import { Request, Response } from "express";
import { AccountService } from "../services/account.service";

export class AccountController {
    private accountService = new AccountService();

    createAccount = async (req: Request, res: Response) => {
        try {
            const account = await this.accountService.createAccount(req.body);
            return res.status(201).json({
                success: true,
                message: 'account created successfully',
                data: account
            })
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create account'
            });
        }
    }

    getAccounts = async (req: Request, res: Response) => {
        try {
            const accounts = await this.accountService.getAccounts();

            return res.status(200).json({
                success: true,
                message: 'Accounts fetched successfully',
                data: accounts
            })
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch accounts'
            })
        }
    }

    getAccountById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string
            const accountDetails = await this.accountService.getAccountById(id);
            return res.status(200).json({
                success: true,
                message: "Account fetched successfully",
                data: accountDetails
            })
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch Account"
            })
        }
    }

    updateAccount = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const body = req.body
            const updatedAccount = await this.accountService.updateAccount(id, body);
            return res.status(201).json({
                success: true,
                message: "Account updated successfully",
                data: updatedAccount
            })
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to update Account"
            })
        }
    }

    deleteAccount = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const deletedaccount = await this.accountService.deleteAccount(id);
            return res.status(201).json({
                success: true,
                message: "Account deleted successfully",
                data: deletedaccount
            })
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to delete Account"
            })
        }
    }
}