import { CustomerStatus } from "@prisma/client";

export interface CreateCustomerDto {
  customerNumber: string;
  userId: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: Date;
  status: CustomerStatus;
}
export interface BranchCreateCustomerDto {
    name: string;
    email: string;
    temporaryPassword?: string;
    phoneNumber: string;
    address?: string;
    dateOfBirth?: string;
}
