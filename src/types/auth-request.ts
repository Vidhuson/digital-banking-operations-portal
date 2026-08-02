import { Request } from 'express';
import { Role } from '@prisma/client';

// JWT data stored in token after login
export interface UserJwtPayload {
  userId: string;
  userNumber: string;
  email: string;
  role: Role;
}

// Custom Express request interface  - contains both Express Request properties + custom property (user)
export interface AuthRequest extends Request { // Extends default Express Request object 
  user?: UserJwtPayload;
}