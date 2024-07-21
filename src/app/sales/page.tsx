import prisma from "@/lib/prisma"
import { Product, Sale } from "@prisma/client"

import { Button } from "@/components/ui/button"

const Sales = async () => {
  const sales: Sale[] = await prisma.sale.findMany({
    orderBy: { createdAt: "desc" },
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
    </main>
  )
}

export default Sales
