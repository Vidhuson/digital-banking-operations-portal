
import { prisma } from '../config/prisma';
import { CreateCustomerDto } from '../dtos/customer.dto';

export class CustomerRepository {

    createCustomer = async (customerData: CreateCustomerDto) => {
        return prisma.customer.create({
            data: customerData
        });
    }

    findCustomerByEmail = async (email: string) => {
        return prisma.customer.findUnique({
            where: { email }
        });
    };

    getCustomers = async () => {
        return prisma.customer.findMany();
    };

    getCustomerById = async (id: string) => {
        return prisma.customer.findUnique({
            where: { id }
        })
    }

    updateCustomer = async (id: string, updateData: Partial<CreateCustomerDto>) => {
        return prisma.customer.update({
            where: { id },
            data: updateData
        });
    };

    deleteCustomer = async (id: string) => {
        return prisma.customer.delete({
            where: { id }
        });
    };
}