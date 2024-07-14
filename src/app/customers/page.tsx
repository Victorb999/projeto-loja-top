import prisma from "@/lib/prisma"
import { Customer } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { CustomerList } from "@/containers/CustomerList/CustomerList"

const Customers = async () => {
  const customers: Customer[] = await prisma.customer.findMany({
    where: { active: true },
  })

  return (
    <main className="flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold mb-8">Lista de Clientes</h1>
      <div className="flex gap-4">
        <Button variant={"default"}>
          <a href="/customer/new">+ Novo cliente</a>
        </Button>
        <Button variant="secondary">
          <a href="/">Voltar</a>
        </Button>
      </div>
      <CustomerList customers={customers} />
    </main>
  )
}

export default Customers
