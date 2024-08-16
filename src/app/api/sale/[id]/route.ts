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

export async function POST(req: Request) {
  const body = await req.json()

  const saleObj = {
    customerId: body.customerId,
    numberItems: body.numberItems,
    paymentMethod: body.paymentMethod,
    totalPrice: body.totalPrice,
    finalDate: new Date(),
  }

  console.log("body", body)

  try {
    const newSale = await prisma.sale.update({
      data: saleObj,
      where: {
        id: body.id,
      },
    })

    body.items.map(async (item: any) => {
      await prisma.item.create({
        data: {
          unitaryPrice: item.price,
          productId: item.productId,
          saleId: newSale.id,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        },
      })
    })

    return NextResponse.json({
      message: "Registro inserido com sucesso",
      newSale,
    })
  } catch (error) {
    console.error("Erro ao inserir registro:", saleObj)
    return NextResponse.json({ error: "Erro ao inserir registro" })
  } finally {
    await prisma.$disconnect()
  }
}
