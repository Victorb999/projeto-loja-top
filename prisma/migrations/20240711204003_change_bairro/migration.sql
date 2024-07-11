/*
  Warnings:

  - You are about to drop the column `bairro` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "bairro",
ADD COLUMN     "neighborhood" VARCHAR(25);
