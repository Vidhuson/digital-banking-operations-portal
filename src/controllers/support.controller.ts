import { Request, Response } from "express";

import { HttpStatus } from "../utils/http-status";
import { ApiResponse } from "../utils/api-response";

import { SupportService } from "../services/support.service";

export class SupportController {

    private readonly supportService = new SupportService();

    createTicket = async ( req: Request, res: Response ) => {

        const response = await this.supportService.createTicket(req.body);

        return ApiResponse.success(
            res,
            HttpStatus.CREATED,
            "Support ticket created successfully.",
            response
        );
    };

    getMyTickets = async ( _req: Request, res: Response ) => {

        const response = await this.supportService.getMyTickets();

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Support tickets retrieved successfully.",
            response
        );

    };

    getTicketByTicketNumber = async ( req: Request, res: Response ) => {

        const ticketnumber = req.params.ticketNumber as string;

        const response = await this.supportService.getTicketByTicketNumber(ticketnumber);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Support ticket retrieved successfully.",
            response
        );
    };
}