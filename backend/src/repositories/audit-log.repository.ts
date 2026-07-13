import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { CreateAuditLogDto, CreateAuditLogRepositoryDto } from "../dtos/audit-log.dto";

export class AuditLogRepository {
    createAuditLog = async (auditLog: CreateAuditLogRepositoryDto, tx?: Prisma.TransactionClient) => {
        const prismaClient = tx ?? prisma;
        return await prismaClient.auditLog.create({
            data: auditLog
        });
    }
}
