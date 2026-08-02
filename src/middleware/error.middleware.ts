import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof Error) {
        message = error.message;
    }
    return ApiResponse.error(res, statusCode, message);

};