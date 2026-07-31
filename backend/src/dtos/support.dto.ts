import {
    SupportCategory,
    SupportPriority,
    SupportStatus
} from "@prisma/client";


export interface CreateSupportDto {
    subject: string;
    description: string;
    category: SupportCategory;
    priority: SupportPriority;
}

export interface SupportDto {
    ticketNumber: string;
    subject: string;
    category: SupportCategory;
    priority: SupportPriority;
    status: SupportStatus;
    createdAt: Date;
}

export interface SupportDetailsDto {
    ticketNumber: string;
    subject: string;
    description: string;
    category: SupportCategory;
    priority: SupportPriority;
    status: SupportStatus;
    createdAt: Date;
    updatedAt: Date;
}