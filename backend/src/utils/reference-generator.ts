export class ReferenceGenerator {

    private static generateSequence(length: number): string {
        const randomNumber = Math.floor(
            Math.random() * Math.pow(10, length)
        );

        return randomNumber
            .toString()
            .padStart(length, "0");

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
        const date = new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");
        return `TXN${date}${this.generateSequence(8)}`;
    }

    static generateFundTransferReference(): string {
        const date = new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");

        return `FT${date}${this.generateSequence(8)}`;
    }

    static generateAuditReference(): string {
        const date = new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");

        return `AUD${date}${this.generateSequence(8)}`;
    }
}