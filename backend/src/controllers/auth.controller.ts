import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types/auth-request';

export class AuthController {
    private authService = new AuthService();

    signup = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.signup(req.body);
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user
            });
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.login(req.body);

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    //authRequest type add which contains express request + user property
    getProfile = async (req: AuthRequest, res: Response) => {
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: req.user
        });
    };

}