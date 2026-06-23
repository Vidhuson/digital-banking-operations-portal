import { Role } from "@prisma/client";
import { AuthRequest } from "../types/auth-request";
import { NextFunction, Response } from "express";

export const authorize = (...allowedRoles: Role[]) => {

  const roleAuthorizationMiddleware  =  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Access denied'
      });
    }

    next();
  };

  return roleAuthorizationMiddleware;
};