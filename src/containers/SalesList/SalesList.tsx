"use client"
import { TableSales } from "@/components/TableSales/TableSales"
import { Button } from "@/components/ui/button"
import { useSaleList } from "@/hooks/useSaleList"
import { SaleListInterface } from "@/types/types"
import { Label } from "@radix-ui/react-label"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"

interface Props {
  sales: SaleListInterface
}

export const SalesList = ({ sales }: Props) => {
  const { filteredSales, filterSalesByStatus, deleteSaleRequest } =
    useSaleList(sales)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button onClick={() => filterSalesByStatus(null)} variant={"outline"}>
          Todas
        </Button>
        <Button onClick={() => filterSalesByStatus(false)} variant={"outline"}>
          Filtrar finalizadas
        </Button>
        <Button onClick={() => filterSalesByStatus(true)} variant={"outline"}>
          Filtrar pendentes
        </Button>
      </div>

      {filteredSales.sales.length > 0 && (
        <TableSales
          sales={filteredSales}
          deleteSaleRequest={deleteSaleRequest}
        />
      )}
    </div>
  )
}
