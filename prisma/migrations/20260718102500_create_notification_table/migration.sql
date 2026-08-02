-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "notificationReference" TEXT NOT NULL,
    "userNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_notificationReference_key" ON "public"."Notification"("notificationReference");

-- CreateIndex
CREATE INDEX "Notification_userNumber_idx" ON "public"."Notification"("userNumber");
