
import { CustomerStatus, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { CreateCustomerDto } from '../dtos/customer.dto';

export class CustomerRepository {

    createCustomer = async (customerData: CreateCustomerDto, tx: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.customer.create({
            data: customerData
        });
    }

    getCustomers = async () => {
        return prisma.customer.findMany();
    };

    getCustomerById = async (id: string) => {
        return prisma.customer.findUnique({
            where: { id }
        })
    }

    updateCustomer = async (id: string, updateData: Partial<CreateCustomerDto>, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.customer.update({
            where: { id },
            data: updateData
        });
    };

    deleteCustomer = async (id: string, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.customer.delete({
            where: { id }
        });
    };

    getPendingCustomers = async () => {
        return prisma.customer.findMany({
            where: {
                status: CustomerStatus.PENDING_APPROVAL
            },
            include: {
                user: true
            }
        });
    };

    getCustomerByCustomerNumber = async (customerNumber: string) => {
        return prisma.customer.findUnique({
            where: {
                customerNumber
            },
            include: {
                user: true
            }
        });
    };

    updateCustomerStatus = async (
        id: string,
        status: CustomerStatus,
        tx?: Prisma.TransactionClient
    ) => {
        const dbClient = tx ?? prisma;

        return dbClient.customer.update({
            where: { id },
            data: { status }
        });
    };
}