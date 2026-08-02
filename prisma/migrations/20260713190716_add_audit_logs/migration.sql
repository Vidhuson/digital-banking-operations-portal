-- CreateEnum
CREATE TYPE "public"."AuditModule" AS ENUM ('AUTH', 'CUSTOMER', 'ACCOUNT', 'TRANSACTION', 'DASHBOARD');

-- CreateEnum
CREATE TYPE "public"."AuditAction" AS ENUM ('SIGNUP', 'LOGIN', 'CREATE_CUSTOMER', 'UPDATE_CUSTOMER', 'CREATE_ACCOUNT', 'DEPOSIT', 'WITHDRAW', 'FUND_TRANSFER', 'VIEW_CUSTOMER_DASHBOARD', 'VIEW_ADMIN_DASHBOARD');

-- CreateEnum
CREATE TYPE "public"."AuditStatus" AS ENUM ('SUCCESS', 'FAILURE');

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "auditReference" TEXT NOT NULL,
    "userNumber" TEXT NOT NULL,
    "userRole" "public"."Role" NOT NULL,
    "module" "public"."AuditModule" NOT NULL,
    "action" "public"."AuditAction" NOT NULL,
    "entityReference" TEXT,
    "status" "public"."AuditStatus" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditLog_auditReference_key" ON "public"."AuditLog"("auditReference");

-- CreateIndex
CREATE INDEX "AuditLog_userNumber_idx" ON "public"."AuditLog"("userNumber");

-- CreateIndex
CREATE INDEX "AuditLog_module_idx" ON "public"."AuditLog"("module");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "public"."AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "public"."AuditLog"("createdAt");
