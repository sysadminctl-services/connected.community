-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOUSE', 'APARTMENT', 'COMMERCIAL_SPACE', 'OTHER');

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "type" "PropertyType" NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "condominiumId" INTEGER NOT NULL,
    "ownerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
