// pages/api/getCustomers.js
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const items = await prisma.item.findMany({})
    return NextResponse.json(items, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar items:", error)
    return NextResponse.json({ error: "Erro ao buscar items" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()

  console.log(body)
  try {
    const newSale = await prisma.item.create({
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
