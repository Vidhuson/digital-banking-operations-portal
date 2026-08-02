import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export class ProfileController {
    private readonly profileService = new ProfileService();

    getMyProfile = async (_req: Request, res: Response) => {

        const profile = await this.profileService.getMyProfile();

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Profile retrieved successfully.",
            profile
        );
    };

    updateMyProfile = async (req: Request, res: Response) => {

        await this.profileService.updateMyProfile(req.body);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Profile updated successfully."
        );
    };
}