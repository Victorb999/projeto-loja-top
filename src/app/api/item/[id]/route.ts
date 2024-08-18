import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface params {
  id: string
}

export async function DELETE(req: Request, { params }: any) {
  const id = params.id
  try {
    const item = await prisma.item.delete({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error("Erro ao deletar item:", error)
    return NextResponse.json({ error: "Erro ao deletar item" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(req: Request, { params }: any) {
  const id = params.id
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error("Erro ao buscar item:", error)
    return NextResponse.json({ error: "Erro ao buscar item" })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json()
  const id = params.id
  try {
    const item = await prisma.item.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error("Erro ao atualizar item:", error)
    return NextResponse.json({ error: "Erro ao atualizar item" })
  } finally {
    await prisma.$disconnect()
  }
}
