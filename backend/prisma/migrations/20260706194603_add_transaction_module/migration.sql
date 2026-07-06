/*
  Warnings:

  - Added the required column `branchName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifscCode` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'FUND_TRANSFER');

-- CreateEnum
CREATE TYPE "public"."TransactionMode" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."TransactionChannel" AS ENUM ('BRANCH', 'ATM', 'INTERNET_BANKING', 'MOBILE_BANKING');

-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "branchName" TEXT NOT NULL,
ADD COLUMN     "ifscCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "transactionReference" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "counterpartyAccountNumber" TEXT,
    "transactionType" "public"."TransactionType" NOT NULL,
    "transactionMode" "public"."TransactionMode" NOT NULL,
    "transactionChannel" "public"."TransactionChannel" NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "openingBalance" DECIMAL(15,2) NOT NULL,
    "closingBalance" DECIMAL(15,2) NOT NULL,
    "status" "public"."TransactionStatus" NOT NULL,
    "remarks" TEXT,
    "sourceReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_transactionReference_idx" ON "public"."Transaction"("transactionReference");

-- CreateIndex
CREATE INDEX "Transaction_accountNumber_idx" ON "public"."Transaction"("accountNumber");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
