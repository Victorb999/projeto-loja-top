// pages/api/getCustomers.js
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const sales = await prisma.sale.findMany({})
    return NextResponse.json(sales, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar vendas:", error)
    return NextResponse.json(
      { error: "Erro ao buscar vendas" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)
  try {
    const newSale = await prisma.sale.create({
      data: body,
    })

    return NextResponse.json({
      message: "Registro inserido com sucesso",
      newSale,
    })
  } catch (error) {
    console.error("Erro ao inserir registro:", error)
    return NextResponse.json({ error: "Erro ao inserir registro" })
  } finally {
    await prisma.$disconnect()
  }
}
