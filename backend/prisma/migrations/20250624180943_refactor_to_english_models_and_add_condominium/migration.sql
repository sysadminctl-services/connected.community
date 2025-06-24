/*
  Warnings:

  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_rolId_fkey";

-- DropTable
DROP TABLE "Rol";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condominium" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "country" TEXT NOT NULL DEFAULT 'MX',
    "state" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "exteriorNumber" TEXT NOT NULL,
    "interiorNumber" TEXT,
    "postalCode" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'America/Mexico_City',
    "language" TEXT NOT NULL DEFAULT 'es-MX',
    "currency" TEXT NOT NULL DEFAULT 'MXN',
    "taxId" TEXT NOT NULL,
    "fiscalRegimeCode" TEXT NOT NULL,
    "bankName" TEXT,
    "bankAccountNumber" TEXT,
    "bankClabe" TEXT,
    "administratorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Condominium_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Condominium_taxId_key" ON "Condominium"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "Condominium_bankClabe_key" ON "Condominium"("bankClabe");

-- CreateIndex
CREATE UNIQUE INDEX "Condominium_administratorId_key" ON "Condominium"("administratorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condominium" ADD CONSTRAINT "Condominium_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
