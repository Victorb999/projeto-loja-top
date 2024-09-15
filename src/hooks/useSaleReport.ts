import { useToast } from "@/components/ui/use-toast"
import { SaleListInterface } from "@/types/types"
import { use, useCallback, useEffect, useState } from "react"

interface Props {
  params: {
    dateInitial: string | undefined
    dateFinal: string | undefined
  }
}

export const useSaleReport = ({ params }: Props) => {
  const { toast } = useToast()
  const [filteredSales, setFilteredSales] = useState<SaleListInterface[]>()

  const requestSales = useCallback(async () => {
    const response = await fetch(
      `/api/sales?dateInitial=${params.dateInitial}&dateFinal=${params.dateFinal}`
    )
    const sales = await response.json()
    setFilteredSales(sales)
  }, [params.dateInitial, params.dateFinal])

  const totalByPaymentMethod = useCallback(() => {
    if (!filteredSales) return

    const total = filteredSales.reduce((acc: any, sale) => {
      const paymentMethod = sale.paymentMethod || ""
      acc[paymentMethod] =
        (acc[paymentMethod] || 0) +
        parseFloat(parseFloat(sale.totalPrice).toFixed(2))
      return acc
    }, {})

    return total
  }, [filteredSales])

  useEffect(() => {
    if (params.dateFinal && params.dateInitial) requestSales()
  }, [params, requestSales])

  return {
    filteredSales,
    totalByPaymentMethod,
  }
}
