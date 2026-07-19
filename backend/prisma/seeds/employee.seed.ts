import { PrismaClient, Role, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedEmployee(prisma: PrismaClient) {
  const existingEmployee = await prisma.user.findUnique({
    where: {
      email: "employee@bank.com",
    },
  });

  if (existingEmployee) {
    console.log("ℹ️ Employee already exists");
    return;
  }

  const password = await bcrypt.hash("Employee@123", 10);

  const employee = await prisma.user.create({
    data: {
      userNumber: "USR000002",
      name: "Bank Employee",
      email: "employee@bank.com",
      password,
      role: Role.EMPLOYEE,
      status: UserStatus.ACTIVE,
      isFirstLogin: false,
    },
  });

  await prisma.employee.create({
    data: {
      employeeNumber: "EMP000001",
      userId: employee.id,
      department: "Operations",
      designation: "Relationship Manager",
      branchName: "Chennai Main Branch",
    },
  });

  console.log("✅ Employee seeded");
}