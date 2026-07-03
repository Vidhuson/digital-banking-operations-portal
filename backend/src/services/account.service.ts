import { AccountRepository } from "../repositories/account.repository"
import { CustomerRepository } from "../repositories/customer.repository";
import { CreateAccountDto, UpdateAccountDto } from "../dtos/account.dto";
import { AccountStatus } from "@prisma/client";
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";

export class AccountService {
    private accountRepository = new AccountRepository();
    private customerRepository = new CustomerRepository();

    createAccount = async (accountData: CreateAccountDto) => {

        const customer = await this.customerRepository.getCustomerById(accountData.customerId);

        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Customer not found');

        const accountNumber = `ACC${Date.now()}`;

        const accountDetails = await this.accountRepository.createAccount({
            accountNumber: accountNumber,
            customerId: accountData.customerId,
            accountType: accountData.accountType,
            balance: 0,
            currency: 'INR',
            status: AccountStatus.ACTIVE
        })
        return accountDetails;
    }

    getAccounts = async () => {
        return this.accountRepository.getAccounts();
    }

    getAccountById = async (id: any) => {
        const account = await this.accountRepository.getAccountById(id);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");
        return account;
    }

    updateAccount = async (id: string, updateAccData: UpdateAccountDto) => {
        const account = await this.accountRepository.getAccountById(id);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");
        return this.accountRepository.updateAccount(id, updateAccData);
    }

    deleteAccount = async (id: string) => {
        const account = await this.accountRepository.getAccountById(id);
        if (!account) throw new ApiError(HttpStatus.NOT_FOUND, "Account not found");
        return this.accountRepository.deleteAccount(id);
    }
}