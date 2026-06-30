import { AccountRepository } from "../repositories/account.repository"
import { CustomerRepository } from "../repositories/customer.repository";
import { CreateAccountDto } from "../dtos/account.dto";
import { AccountStatus } from "@prisma/client";

export class AccountService {
    private accountRepository = new AccountRepository();
    private customerRepository = new CustomerRepository();
    
    createAccount = async (accountData : CreateAccountDto) => {

        const customer = await this.customerRepository.getCustomerById(accountData.customerId);

        if(!customer) throw new Error('Customer not found');

        const accountNumber = `ACC${Date.now()}`;
        
        const accountDetails = await this.accountRepository.createAccount({
            accountNumber: accountNumber,
                    customerId: accountData.customerId,
                    accountType: accountData.accountType ,
                    balance: 0,
                    currency: 'INR',
                    status: AccountStatus.ACTIVE
        })    
        return accountDetails;
    }
}