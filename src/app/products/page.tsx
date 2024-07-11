import prisma from "@/lib/prisma"
import { Product } from "@prisma/client"

import { TableCustomers } from "@/components/TableCustomers/TableCustomers"
import { Button } from "@/components/ui/button"
import { TableProducts } from "@/components/TableProducts/TableProducts"

const Products = async () => {
  const products: Product[] = await prisma.product.findMany({
    where: { active: true },
  })

  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(),
    priceSpend: product.priceSpend.toString(),
  }))

  return (
    <main className="flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold mb-8">Lista de Produtos</h1>
      <div className="flex gap-4">
        <Button variant={"default"}>
          <a href="/product/new">+ Novo produto</a>
        </Button>
        <Button variant="secondary">
          <a href="/">Voltar</a>
        </Button>
      </div>
      <TableProducts products={serializedProducts} />
    </main>
  )
}

export default Products
