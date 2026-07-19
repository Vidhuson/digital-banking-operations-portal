import { PrismaClient, Role, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedAdmin(prisma: PrismaClient) {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@bank.com",
    },
  });

  if (existingAdmin) {
    console.log("ℹ️ Admin already exists");
    return;
  }

  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      userNumber: "USR000001",
      name: "System Admin",
      email: "admin@bank.com",
      password,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      isFirstLogin: false,
    },
  });

  console.log("✅ Admin seeded");
}