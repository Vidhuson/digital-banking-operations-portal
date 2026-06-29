import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerDto } from '../dtos/customer.dto';

export class CustomerService {

    private customerRepository = new CustomerRepository();

    createCustomer = async (customerData: CreateCustomerDto) => {

        const customer = await this.customerRepository.findCustomerByEmail(customerData.email);

        if (customer)
            throw new Error('Customer already exists');

        const customerNumber = `CUST${Date.now()}`;
        const customerToCreate = {
            ...customerData,
            customerNumber
        };
        
        return this.customerRepository.createCustomer(customerToCreate);
    }

    getCustomers = async () => {
        return this.customerRepository.getCustomers();
    }

    getCustomerById = async (id: string) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new Error('Customer not found');
        return customer;
    }

    updateCustomer = async (id: string, customerData: Partial<CreateCustomerDto>) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new Error("Customer not found");
        return this.customerRepository.updateCustomer(id, customerData);
    };

    deleteCustomer = async (id : string) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new Error("Customer not found");
        return this.customerRepository.deleteCustomer(id);
    }


    
}