/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cliente";

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "sex" VARCHAR(1),
    "birthDate" TIMESTAMP(3),
    "rgie" VARCHAR(14),
    "cpfcnpj" VARCHAR(14),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" VARCHAR(11),
    "email" VARCHAR(100),
    "cep" VARCHAR(8),
    "address" VARCHAR(50),
    "number" VARCHAR(25),
    "complement" VARCHAR(50),
    "bairro" VARCHAR(25),
    "city" VARCHAR(25),
    "state" VARCHAR(2),
    "blocked" BOOLEAN NOT NULL,
    "lastBuy" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "priceSpend" DECIMAL(12,2) NOT NULL,
    "codeBar" VARCHAR(30) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "numberItems" INTEGER NOT NULL,
    "paymentMethod" VARCHAR(50) NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalDate" TIMESTAMP(3),

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitaryPrice" DECIMAL(12,2) NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
