import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserJwtPayload } from '../types/auth-request';
import { RequestContext } from '../context/request-context';


export const authenticate = (req: AuthRequest, res: Response, next: NextFunction ) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("auth: " + authHeader);

        if(!authHeader) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. No token provided.' 
            });
        }

        // Extract JWT token 
        const token = authHeader.split(' ')[1]; 
        
        // Verify token 
        const decoded = jwt.verify( token, process.env.JWT_SECRET as string ) as UserJwtPayload; 
        // Attach decoded user to request 
        req.user = decoded; 

        RequestContext.setCurrentUser(decoded);

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}