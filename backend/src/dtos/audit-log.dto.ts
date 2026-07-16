import { Role, AuditModule, AuditAction, AuditStatus, Prisma } from "@prisma/client";

export interface CreateAuditLogDto {
    userNumber: string;
    userRole: Role;
    module: AuditModule;
    action: AuditAction;
    entityReference?: string;
    status: AuditStatus;
    description: string;
    tx?: Prisma.TransactionClient;
}

export interface CreateAuditLogRepositoryDto {
    auditReference: string;
    userNumber: string;
    userRole: Role;
    module: AuditModule;
    action: AuditAction;
    entityReference?: string;
    status: AuditStatus;
    description: string;
}

export interface SearchAuditLogDto {
    auditReference?: string;
    userNumber?: string;
    module?: AuditModule;
    status?: AuditStatus;
}