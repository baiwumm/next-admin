-- CreateTable
CREATE TABLE "Internalization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "zh" TEXT,
    "en" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Internalization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Internalization" ADD CONSTRAINT "Internalization_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Internalization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
