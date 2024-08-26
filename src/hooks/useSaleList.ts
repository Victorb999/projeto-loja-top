import { useToast } from "@/components/ui/use-toast"
import { SaleListInterface } from "@/types/types"
import { useState } from "react"

export const useSaleList = (sales: SaleListInterface) => {
  const { toast } = useToast()
  const [filteredSales, setFilteredSales] = useState(sales)

  const filterSalesByStatus = (isOpen: boolean | null) => {
    if (isOpen === null) {
      setFilteredSales({ sales: sales.sales })
      return
    }
    const salesFiltered = sales.sales.filter((sale) => {
      if (isOpen) {
        return sale.finalDate === null
      }
      return sale.finalDate
    })
    setFilteredSales({ sales: salesFiltered })
  }

  const handleDelete = (id: number) => {
    const salesWithoutDeleted = filteredSales.sales.filter(
      (sale) => sale.id !== id
    )
    setFilteredSales({ sales: salesWithoutDeleted })
  }

  const deleteSaleRequest = async (id: number) => {
    try {
      await fetch(`/api/sale/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      handleDelete(id)
      toast({
        title: "Venda Deletada",
        description: "Deletamos essa venda",
      })
    } catch (error) {
      toast({
        title: "Ops, algo deu errado",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return {
    filteredSales,
    filterSalesByStatus,
    deleteSaleRequest,
  }
}
