// pages/api/getCustomers.js
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const param = await req.nextUrl.searchParams.get("saleId")
  const saleId = param ?? ""
  try {
    const items = await prisma.item.findMany({
      ...(param && { where: { saleId: parseInt(saleId) } }),
    })
    return NextResponse.json(items, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar items:", error)
    return NextResponse.json({ error: "Erro ao buscar items" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()

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
