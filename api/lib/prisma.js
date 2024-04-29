// Correctly import the CommonJS module
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

// Initialize the PrismaClient
const prisma = new PrismaClient();

// Export the prisma instance
export default prisma;
