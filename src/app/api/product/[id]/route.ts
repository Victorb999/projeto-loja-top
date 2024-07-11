import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface params {
  id: string
}

export async function DELETE(req: Request, { params }: any) {
  const id = params.id
  try {
    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Erro ao deletar cliente:", error)
    return NextResponse.json({ error: "Erro ao deletar cliente" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(req: Request, { params }: any) {
  const id = params.id
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return NextResponse.json({ error: "Erro ao buscar cliente" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()
  const id = params.id
  try {
    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    return NextResponse.json({ error: "Erro ao atualizar cliente" })
  } finally {
    await prisma.$disconnect()
  }
}
