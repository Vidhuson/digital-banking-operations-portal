import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types/auth-request';
import { ApiResponse } from '../utils/api-response';
import { HttpStatus } from '../utils/http-status';
import { RequestContext } from '../context/request-context';

export class AuthController {
    private authService = new AuthService();

    signup = async (req: Request, res: Response) => {
        const user = await this.authService.signup(req.body);
        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "User registered successfully.",
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

    changePassword = async (

        req: Request,

        res: Response

    ) => {

        const userId = RequestContext.getCurrentUser()?.userId as string;

        await this.authService.changePassword(userId, req.body);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Password updated successfully."
        );
    };
    //authRequest type add which contains express request + user property
    getProfile = async (req: AuthRequest, res: Response) => {
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Profile fetched successfully",
            req.user
        );
    };

    adminDashboard = (req: AuthRequest, res: Response) => {
        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Profile fetched successfully",
            req.user
        );
    };

}