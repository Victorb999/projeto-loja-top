import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
  // Seed Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: "John Doe",
      sex: "M",
      birthDate: new Date("1990-01-01"),
      rgie: "123456789",
      cpfcnpj: "12345678901",
      phone: "1234567890",
      email: "johndoe@example.com",
      cep: "12345678",
      address: "123 Main St",
      number: "100",
      complement: "Apt 101",
      neighborhood: "Downtown",
      city: "Cityville",
      state: "ST",
      blocked: false,
      active: true,
    },
  })

  const customer2 = await prisma.customer.create({
    data: {
      name: "Jane Smith",
      sex: "F",
      birthDate: new Date("1985-05-15"),
      rgie: "987654321",
      cpfcnpj: "10987654321",
      phone: "0987654321",
      email: "janesmith@example.com",
      cep: "87654321",
      address: "456 Another St",
      number: "200",
      complement: "Suite 202",
      neighborhood: "Suburbia",
      city: "Townsville",
      state: "TS",
      blocked: false,
      active: true,
    },
  })

  // Seed Products
  const product1 = await prisma.product.create({
    data: {
      name: "tesoura",
      price: 19.99,
      priceSpend: 15.0,
      codeBar: "1234567890123",
      description: "Description of Product 1",
      active: true,
    },
  })

  const product2 = await prisma.product.create({
    data: {
      name: "caixa de papel",
      price: 29.99,
      priceSpend: 20.0,
      codeBar: "0987654321098",
      description: "Description of Product 2",
      active: true,
    },
  })

  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        name: `Product ${i + 3}`,
        price: 3.99 + i,
        priceSpend: 1.0 + i,
        codeBar: `1234567890${i + 3}`,
        description: `Description of Product ${i + 3}`,
        active: true,
      },
    })
  }

  console.log({ customer1, customer2, product1, product2 })
}

main()
  .then(() => {
    console.log("Data seeded successfully")
  })
  .catch((e) => {
    console.error("Error seeding data:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
