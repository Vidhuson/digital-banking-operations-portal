
import { CreateSupportDto, SupportDetailsDto, SupportDto } from "../dtos/support.dto";
import { SupportRepository } from "../repositories/support.repository";
import { CustomerRepository } from "../repositories/customer.repository";

import { ReferenceGenerator } from "../utils/reference-generator";
import { ApiError } from "../utils/api-error";
import { RequestContext } from "../context/request-context";
import { HttpStatus } from "../utils/http-status";

export class SupportService {

    private readonly supportRepository = new SupportRepository();
    private readonly customerRepository = new CustomerRepository();

        private getCurrentUser = () => {
            const currentUser = RequestContext.getCurrentUser();
            if (!currentUser)
                throw new ApiError(
                    HttpStatus.UNAUTHORIZED,
                    "Current user not found."
                );
            return currentUser;
        }

    createTicket = async ( data: CreateSupportDto ) => {

        const currentUser = this.getCurrentUser();

        const customer = await this.customerRepository.getMyProfile(
            currentUser.userNumber
        );

        if (!customer) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );
        }

        const ticket = await this.supportRepository.createTicket(
            customer.id,
            ReferenceGenerator.generateSupportReference(),
            data
        );

        return {
            ticketNumber: ticket.ticketNumber
        };

    };

    getMyTickets = async (): Promise<SupportDto[]> => {

        const currentUser = this.getCurrentUser();

        const customer = await this.customerRepository.getMyProfile(
            currentUser.userNumber
        );

        if (!customer) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );
        }

        const tickets = await this.supportRepository.getMyTickets(
            customer.id
        );

        return tickets.map(ticket => ({
            ticketNumber: ticket.ticketNumber,
            subject: ticket.subject,
            category: ticket.category,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt
        }));

    };

    getTicketByTicketNumber = async ( ticketNumber: string ): Promise<SupportDetailsDto> => {

        const currentUser = this.getCurrentUser();

        const customer = await this.customerRepository.getMyProfile(
            currentUser.userNumber
        );

        if (!customer) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Customer not found."
            );
        }

        const ticket =
            await this.supportRepository.getTicketByTicketNumber(
                customer.id,
                ticketNumber
            );

        if (!ticket) {
            throw new ApiError(
                HttpStatus.NOT_FOUND,
                "Support ticket not found."
            );
        }

        return {
            ticketNumber: ticket.ticketNumber,
            subject: ticket.subject,
            description: ticket.description,
            category: ticket.category,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        };
    };
}