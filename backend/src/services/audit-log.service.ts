import { CreateAuditLogDto } from "../dtos/audit-log.dto";
import { AuditLogRepository } from "../repositories/audit-log.repository";
import { ReferenceGenerator } from "../utils/reference-generator";


export class AuditLogService {

    private auditLogRepository = new AuditLogRepository();

    log = async (auditData: CreateAuditLogDto) => {
        const { tx, ...auditLogData } = auditData;

        await this.auditLogRepository.createAuditLog(
            {
                auditReference: ReferenceGenerator.generateAuditReference(),
                ...auditLogData
            },
            tx
        );
    }
}