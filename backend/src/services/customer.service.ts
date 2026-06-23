import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerDto } from "../repositories/customer.repository";

export class CustomerService {

    private customerRepository = new CustomerRepository();

    createCustomer = async (customerData: CreateCustomerDto) => {

        const existingCustomer = await this.customerRepository.findCustomerByEmail(customerData.email);

        if (existingCustomer)
            throw new Error('Customer already exists');

        const customerNumber = `CUST${Date.now()}`;
        const customerToCreate = {
            ...customerData,
            customerNumber
        };
        
        return this.customerRepository.createCustomer(customerToCreate);
    }
}