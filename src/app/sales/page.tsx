import prisma from "@/lib/prisma"

import { Button } from "@/components/ui/button"
import { SalesList } from "@/containers/SalesList/SalesList"

const Sales = async () => {
  const sales = await prisma.sale.findMany({
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
      customerId: true,
      Customer: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <main className="flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold mb-8">Vendas</h1>
      <div className="flex gap-4">
        <Button variant={"default"}>
          <a href="/sale/new">+ Nova venda</a>
        </Button>
        <Button variant="secondary">
          <a href="/">Voltar</a>
        </Button>
      </div>
      <SalesList sales={{ sales }} />
    </main>
  )
}

export default Sales
