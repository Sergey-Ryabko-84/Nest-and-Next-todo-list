import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function dropDb() {
  await prisma.$executeRaw`DROP SCHEMA public CASCADE;`;
  await prisma.$executeRaw`CREATE SCHEMA public;`;
}

dropDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
