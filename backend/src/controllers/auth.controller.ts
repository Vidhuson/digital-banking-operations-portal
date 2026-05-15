import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';

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
}