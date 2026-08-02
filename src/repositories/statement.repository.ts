import { prisma } from "../config/prisma";

export class StatementRepository {

    getStatement = async (
        customerId: string,
        accountNumber: string,
        fromDate: Date,
        toDate: Date,
        page: number,
        limit: number
    ) => {

        const account = await prisma.account.findFirst({
            where: {
                customerId,
                accountNumber
            }
        });

        if (!account) {
            return null;
        }
        const transactions = await prisma.transaction.findMany({
            where: {
                accountNumber,
                createdAt: {
                    gte: fromDate,
                    lte: toDate
                }
            },
            orderBy: {
                createdAt: "asc"
            },
            skip: (page - 1) * limit,
            take: limit
        });

        return {
            account,
            transactions
        };
    };
}