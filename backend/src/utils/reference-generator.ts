export class ReferenceGenerator {

    private static generateSequence(length: number): string {
        const randomNumber = Math.floor(
            Math.random() * Math.pow(10, length)
        );

        return randomNumber
            .toString()
            .padStart(length, "0");

    }

    private static generateDateBasedReference(prefix: string): string {
        const date = new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");

        return `${prefix}${date}${this.generateSequence(8)}`;
    }

    static generateUserNumber(): string {
        return `USR${this.generateSequence(8)}`;

    }

    static generateCustomerNumber(): string {
        return `CIF${this.generateSequence(9)}`;

    }

    static generateAccountNumber(): string {
        const prefix = "4012";
        const suffix = this.generateSequence(12);
        return `${prefix}${suffix}`;
    }

    static generateTransactionReference(): string {
        return this.generateDateBasedReference("TXN");;
    }

    static generateFundTransferReference(): string {
        return this.generateDateBasedReference("FT");
    }

    static generateAuditReference(): string {
        return this.generateDateBasedReference("AUD");
    }

    static generateNotificationReference(): string {
        return this.generateDateBasedReference("NOT");
    }

    static generateSupportReference(): string {
    return this.generateDateBasedReference("TKT");
}
}