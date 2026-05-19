import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';


// Custom Express request interface  - contains both Express Request properties + custom property (user)
export interface AuthRequest extends Request { // Extends default Express Request object 
  user?: string | JwtPayload;
}