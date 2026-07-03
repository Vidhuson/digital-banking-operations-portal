import { CustomerRepository } from "../repositories/customer.repository";
import { CreateCustomerDto } from '../dtos/customer.dto';
import { ApiError } from "../utils/api-error";
import { HttpStatus } from "../utils/http-status";

export class CustomerService {

    private customerRepository = new CustomerRepository();

    createCustomer = async (customerData: CreateCustomerDto) => {

        const customer = await this.customerRepository.findCustomerByEmail(customerData.email);

        if (customer) throw new ApiError(HttpStatus.CONFLICT, 'Customer already exists');

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
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Customer not found');
        return customer;
    }

    updateCustomer = async (id: string, customerData: Partial<CreateCustomerDto>) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");
        return this.customerRepository.updateCustomer(id, customerData);
    };

    deleteCustomer = async (id: string) => {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");
        return this.customerRepository.deleteCustomer(id);
    }
}