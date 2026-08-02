
import { CustomerStatus, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { CreateCustomerDto } from '../dtos/customer.dto';
import { UpdateProfileDto } from '../dtos/profile.dto';
import { HttpStatus } from '../utils/http-status';
import { ApiError } from '../utils/api-error';

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

    updateCustomerStatus = async (id: string, status: CustomerStatus, tx?: Prisma.TransactionClient) => {
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

    getMyProfile = async (userNumber: string) => {
        return await prisma.customer.findFirst({
            where: {
                user: {
                    userNumber
                }
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
    }

    updateMyProfile = async (userNumber: string, profile: UpdateProfileDto) => {

        const customer = await this.getMyProfile(userNumber);

        if (!customer) throw new ApiError(HttpStatus.NOT_FOUND, 'Profile not found');

        return await prisma.customer.update({
            where: {
                id: customer.id
            },
            data: {
                phoneNumber: profile.phoneNumber,
                address: profile.address,
                dateOfBirth: profile.dateOfBirth
            }
        });
    }
}