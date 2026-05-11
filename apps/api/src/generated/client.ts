import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from './prisma/client'

// Declare a global space to store the PrismaClient instance
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

/**
 * @constant {PrismaClient} db
 * @description The single, global instance of PrismaClient.
 * It is either retrieved from the global object (globalThis.prisma) or created if it does not exist.
 */
const db = globalForPrisma.prisma || new PrismaClient({ 
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
})

export default db
 
// In development mode only, the PrismaClient instance is stored in the global object
// (`globalThis`) so that it persists between code reloads.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
