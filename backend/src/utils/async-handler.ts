import {
    NextFunction,
    Request,
    Response
} from "express";

export const asyncHandler = (
    fn: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<unknown>
) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return Promise
            .resolve(fn(req, res, next)) //it execute controller methods.
            .catch(next); //it calls error middleware. 
    };
};