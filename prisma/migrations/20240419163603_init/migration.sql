-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "DataNascimento" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "DataCadastro" SET DEFAULT CURRENT_TIMESTAMP;
