
import { CustomerStatus, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { CreateCustomerDto } from '../dtos/customer.dto';

export class CustomerRepository {

    createCustomer = async (customerData: CreateCustomerDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.customer.create({
            data: customerData
        });
    }

    getCustomers = async () => {
        return prisma.customer.findMany({
            include: {
                user: {
                    select: {
                        userNumber: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true
                    }
                }
            }
        });
    };

    getPendingCustomers = async () => {
        return prisma.customer.findMany({
            where: {
                status: CustomerStatus.PENDING_APPROVAL
            },
            include: {
                user: {
                    select: {
                        userNumber: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true
                    }
                }
            }
        });
    };

    getCustomerByCustomerNumber = async (customerNumber: string) => {
        return prisma.customer.findUnique({
            where: {
                customerNumber
            },
            include: {
                user: {
                    select: {
                        userNumber: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true
                    }
                }
            }
        });
    };

    updateCustomer = async (customerNumber: string, updateData: Partial<CreateCustomerDto>, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.customer.update({
            where: { customerNumber },
            data: updateData
        });
    };

    updateCustomerStatus = async ( id: string, status: CustomerStatus, tx?: Prisma.TransactionClient ) => {
        const dbClient = tx ?? prisma;

        return dbClient.customer.update({
            where: { id },
            data: { status }
        });
    };

    deleteCustomer = async (customerNumber: string, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return dbClient.customer.delete({
            where: { customerNumber }
        });
    };

}