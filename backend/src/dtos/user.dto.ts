import { UserStatus } from "@prisma/client";

export interface SignupDto {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address?: string;
    dateOfBirth?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface CreateUserRepositoryDto {
    userNumber: string;
    name: string;
    email: string;
    password: string;
    status: UserStatus;
    isFirstLogin: boolean;
}