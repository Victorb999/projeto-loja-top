"use client"
import { TableSales } from "@/components/TableSales/TableSales"
import { Button } from "@/components/ui/button"
import { useSaleList } from "@/hooks/useSaleList"
import { SaleListInterface } from "@/types/types"

interface Props {
  sales: SaleListInterface
}

export const SalesList = ({ sales }: Props) => {
  const { filteredSales, filterSalesByStatus, deleteSaleRequest } =
    useSaleList(sales)

  return (
    <div>
      <Button onClick={() => filterSalesByStatus(true)}>
        Filtrar finalizadas
      </Button>
      <Button onClick={() => filterSalesByStatus(false)}>
        Filtrar pendentes
      </Button>
      <TableSales sales={filteredSales} deleteSaleRequest={deleteSaleRequest} />
    </div>
  )
}
