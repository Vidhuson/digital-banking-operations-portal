import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                ApiResponse.error(
                    res,
                    HttpStatus.BAD_REQUEST,
                    "Validation failed.",
                    error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        issueMessage: issue.message,
                    }))
                );
                return;
            }
            next(error);
        }
    };
};