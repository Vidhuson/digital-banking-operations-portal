import { NextFunction, Request, Response } from "express";

import { RequestContext } from "../context/request-context";

export const requestContextMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    RequestContext.run(() => {
        next();
    });

};