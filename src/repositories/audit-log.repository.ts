import { AuditModule, AuditStatus, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateAuditLogRepositoryDto, SearchAuditLogDto } from "../dtos/audit-log.dto";

export class AuditLogRepository {
    createAuditLog = async (auditLog: CreateAuditLogRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return await dbClient.auditLog.create({
            data: auditLog
        });
    }

    searchAuditLogs = async (filters: SearchAuditLogDto) => {
        return prisma.auditLog.findMany({
            where: {
                ...(filters.auditReference && { auditReference: filters.auditReference }),
                ...(filters.userNumber && { userNumber: filters.userNumber }),
                ...(filters.module && { module: filters.module }),
                ...(filters.status && { status: filters.status })
            },

            orderBy: {
                createdAt: "desc"
            }
        });
    }
}
