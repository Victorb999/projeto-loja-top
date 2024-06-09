/*
  Warnings:

  - You are about to drop the column `Limite` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `Saldo` on the `Cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "Limite",
DROP COLUMN "Saldo";
