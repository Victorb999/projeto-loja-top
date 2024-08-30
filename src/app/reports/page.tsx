import prisma from "@/lib/prisma"

import { Button } from "@/components/ui/button"
import { ReportSales } from "@/containers/ReportSales/ReportSales"

const Reports = async () => {
  return (
    <main className="flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold mb-8">Vendas</h1>
      <div className="flex gap-4">
        <Button variant="secondary">
          <a href="/">Voltar</a>
        </Button>
      </div>
      <ReportSales />
    </main>
  )
}

export default Reports
