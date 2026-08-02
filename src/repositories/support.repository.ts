import { prisma } from "../config/prisma";
import { CreateSupportDto } from "../dtos/support.dto";


export class SupportRepository {
    createTicket = async (customerId: string, ticketNumber: string, support: CreateSupportDto ) => {
        return await prisma.supportTicket.create({
            data: {
                ticketNumber,
                customerId,
                subject: support.subject,
                description: support.description,
                category: support.category,
                priority: support.priority
            }
        });
    };

    getMyTickets = async (customerId: string) => {
        return await prisma.supportTicket.findMany({
            where: {
                customerId
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    };

    getTicketByTicketNumber = async ( customerId: string, ticketNumber: string ) => {
        return await prisma.supportTicket.findFirst({
            where: {
                customerId,
                ticketNumber
            }
        });
    };
}