import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types/auth-request';
import { ApiResponse } from '../utils/api-response';
import { HttpStatus } from '../utils/http-status';

export class AuthController {
    private authService = new AuthService();

    signup = async (req: Request, res: Response) => {
        const user = await this.authService.signup(req.body);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "Customer created successfully",
            user
        );
    }

    login = async (req: Request, res: Response) => {
        const result = await this.authService.login(req.body);
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Login successful",
            result
        );
    }

    //authRequest type add which contains express request + user property
    getProfile = async (req: AuthRequest, res: Response) => {
        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: req.user
        });
    };

    adminDashboard = (req: AuthRequest, res: Response) => {
        return res.status(200).json({
            success: true,
            message: 'Welcome Admin',
            data: req.user
        });
    };

}