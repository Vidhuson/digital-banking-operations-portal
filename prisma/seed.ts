import { PrismaClient } from "@prisma/client";
import { runSeeds } from "./seeds";

const prisma = new PrismaClient();

async function main() {
  await runSeeds(prisma);
}

main()  
.then(async () => {
  await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });