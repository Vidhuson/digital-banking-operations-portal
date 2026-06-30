
import { AccountStatus, AccountType } from "@prisma/client";

export interface CreateAccountDto {
    customerId: string;
    accountType: AccountType;
}

export interface UpdateAccountDto {
    accountType?: AccountType;
    status?: AccountStatus;
    currency?: string;
}