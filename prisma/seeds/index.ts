import { PrismaClient } from "@prisma/client";

import { seedAdmin } from "./admin.seed";
import { seedEmployee } from "./employee.seed";

export async function runSeeds(prisma: PrismaClient) {
  console.log("🌱 Running database seeds...\n");

  await seedAdmin(prisma);
  await seedEmployee(prisma);

  console.log("\n🎉 Database seeding completed.");
}