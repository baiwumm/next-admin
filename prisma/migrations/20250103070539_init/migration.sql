/*
  Warnings:

  - You are about to drop the `Internalization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Internalization" DROP CONSTRAINT "Internalization_parentId_fkey";

-- DropTable
DROP TABLE "Internalization";
