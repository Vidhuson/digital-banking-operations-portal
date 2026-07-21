/*
  Warnings:

  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `userNumber` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Notification_userId_idx";

-- AlterTable
ALTER TABLE "public"."Notification" DROP COLUMN "userId",
ADD COLUMN     "userNumber" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Notification_userNumber_idx" ON "public"."Notification"("userNumber");
