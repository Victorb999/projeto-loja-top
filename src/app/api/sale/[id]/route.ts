import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface params {
  id: string
}

export async function DELETE(req: Request, { params }: any) {
  const id = params.id
  try {
    const sale = await prisma.sale.delete({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json(sale)
  } catch (error) {
    console.error("Erro ao deletar venda:", error)
    return NextResponse.json({ error: "Erro ao deletar venda" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(req: Request, { params }: any) {
  const id = params.id
  try {
    const sale = await prisma.sale.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json(sale)
  } catch (error) {
    console.error("Erro ao buscar venda:", error)
    return NextResponse.json({ error: "Erro ao buscar venda" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()
  const id = params.id
  try {
    const sale = await prisma.sale.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    })
    return NextResponse.json(sale)
  } catch (error) {
    console.error("Erro ao atualizar venda:", error)
    return NextResponse.json({ error: "Erro ao atualizar venda" })
  } finally {
    await prisma.$disconnect()
  }
}
