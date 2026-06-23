
import { prisma } from '../config/prisma';

export interface CreateCustomerDto {
  customerNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: Date;
}

export class CustomerRepository {

    createCustomer = async (customerData: CreateCustomerDto) => {
        return prisma.customer.create({
            data: customerData
        });
    }

    findCustomerByEmail = async (email: string) => {
        return prisma.customer.findUnique({
            where: {email}
        });
    };
}