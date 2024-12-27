-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
