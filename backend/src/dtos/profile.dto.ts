import { CustomerStatus } from "@prisma/client";

export interface ProfileDto {
    customerNumber: string;
    userNumber: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    address: string | null;
    dateOfBirth: Date | null;
    status: CustomerStatus;
    createdAt: Date;
}

export interface UpdateProfileDto {
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: Date;
}