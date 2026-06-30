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
}