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
  const [filteredSales, setFilteredSales] = useState<SaleListInterface>()

  const requestSales = useCallback(async () => {
    const response = await fetch(
      `/api/sales?dateInitial=${params.dateInitial}&dateFinal=${params.dateFinal}`
    )
    const sales = await response.json()
    console.log("fodas", sales)
    setFilteredSales({ sales: sales })
  }, [params.dateInitial, params.dateFinal])
  console.log("params2", params)

  useEffect(() => {
    if (params.dateFinal && params.dateInitial) requestSales()
  }, [params, requestSales])

  return {
    filteredSales,
  }
}
