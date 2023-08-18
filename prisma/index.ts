import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Check if the code is running in a Node.js environment
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

// Initialize Prisma Client based on the environment
if (process.env.NODE_ENV === "production") {
  // Create a new Prisma Client instance for production
  prisma = new PrismaClient();
} else {
  // If the code is not in production and prisma is not already initialized globally
  if (!global.prisma) {
    // Create a new Prisma Client instance and assign it to the global object
    global.prisma = new PrismaClient();
  }
  // Use the globally initialized Prisma Client instance
  prisma = global.prisma;
}

export default prisma;
