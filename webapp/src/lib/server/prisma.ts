import {PrismaClient} from '@prisma/client/edge.js'
import {withAccelerate} from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export {prisma};
