import { Request, Response } from "express";
import { AuditLogService } from "../services/audit-log.service";
import { ApiResponse } from "../utils/api-response";
import { HttpStatus } from "../utils/http-status";
import { SearchAuditLogDto } from "../dtos/audit-log.dto";
import { AuditModule, AuditStatus } from "@prisma/client/index-browser";

export class AuditLogController {

    private auditLogService = new AuditLogService();

    searchAuditLogs = async (req: Request, res: Response) => {

        const {
            auditReference,
            userNumber,
            module,
            status
        } = req.query;

        const filters: SearchAuditLogDto = {
            auditReference: auditReference as string,
            userNumber: userNumber as string,
            module: module as AuditModule,
            status: status as AuditStatus
        };

        const response = await this.auditLogService.searchAuditLogs(filters);

        return ApiResponse.success(
            res,
            HttpStatus.OK,
            "Audit logs retrieved successfully.",
            response
        );
    };

}