-- CreateTable
CREATE TABLE "Cliente" (
    "Codigo" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,
    "Sexo" VARCHAR(1),
    "DataNascimento" DATE,
    "RGIE" VARCHAR(14),
    "CPFCNPJ" VARCHAR(14),
    "DataCadastro" TIMESTAMP(3) NOT NULL,
    "Telefone1" VARCHAR(11),
    "Telefone2" VARCHAR(11),
    "Telefone3" VARCHAR(11),
    "Email" VARCHAR(100),
    "CEP" VARCHAR(8),
    "Endereco" VARCHAR(50),
    "Numero" VARCHAR(25),
    "Complemento" VARCHAR(50),
    "Bairro" VARCHAR(25),
    "Cidade" VARCHAR(25),
    "UF" VARCHAR(2),
    "Limite" DECIMAL(9,2),
    "Saldo" DECIMAL(9,2),
    "Bloqueado" BOOLEAN NOT NULL,
    "Vencimento" INTEGER NOT NULL,
    "UltimaCompra" TIMESTAMP(3),
    "Excluido" BOOLEAN NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("Codigo")
);
