/*
  Warnings:

  - You are about to drop the `primarcs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "primarcs";

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);
