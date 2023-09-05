import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
// Cloudflare can't handle global (global is not defined)
// const prisma = global?.prisma || new PrismaClient();
//
// if (process.env.NODE_ENV === "development" && global) {
//     global.prisma = prisma;
// }

export { prisma };
