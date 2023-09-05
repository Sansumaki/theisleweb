import {PrismaClient} from '@prisma/client/edge.js'
import {withAccelerate} from "@prisma/extension-accelerate";
import { DATABASE_URL } from '$env/static/private';

const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL
}).$extends(withAccelerate());

export {prisma};
