import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateAuditLogDto, CreateAuditLogRepositoryDto } from "../dtos/audit-log.dto";

export class AuditLogRepository {
    createAuditLog = async (auditLog: CreateAuditLogRepositoryDto, tx?: Prisma.TransactionClient) => {
        const dbClient = tx ?? prisma;
        return await dbClient.auditLog.create({
            data: auditLog
        });
    }
}
