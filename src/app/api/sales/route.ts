// pages/api/getCustomers.js
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { NextApiRequest } from "next"

export async function GET(req: NextRequest) {
  const dateInitial = req.nextUrl.searchParams.get("dateInitial")
  const dateFinal = req.nextUrl.searchParams.get("dateFinal")

  try {
    const sales = await prisma.sale.findMany({
      ...(dateInitial &&
        dateFinal && {
          where: {
            finalDate: {
              gte: dateInitial ? new Date(dateInitial) : undefined,
              lte: dateFinal ? new Date(dateFinal) : undefined,
            },
          },
        }),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        numberItems: true,
        paymentMethod: true,
        totalPrice: true,
        createdAt: true,
        finalDate: true,
        Customer: {
          select: {
            name: true,
          },
        },
      },
    })
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
