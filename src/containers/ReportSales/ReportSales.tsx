"use client"
import { TableReport } from "@/components/TableReport/TableReport"
import { Input } from "@/components/ui/input"
import { useSaleReport } from "@/hooks/useSaleReport"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"

export const ReportSales = () => {
  const [params, setParams] = useState({ dateInitial: "", dateFinal: "" })

  const { filteredSales, totalByPaymentMethod } = useSaleReport({
    params,
  })

  const totals = totalByPaymentMethod()

  console.log("payment", totals)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Label>Período:</Label>
        <Input
          type="date"
          className="w-[200px]"
          onChange={(e) =>
            setParams({ ...params, dateInitial: e.target.value })
          }
        />
        <Input
          type="date"
          className="w-[200px]"
          onChange={(e) => setParams({ ...params, dateFinal: e.target.value })}
        />
      </div>

      {filteredSales && filteredSales.length > 0 && (
        <TableReport sales={filteredSales} />
      )}

      {totals && (
        <div className="flex flex-col gap-4">
          <p className="text-xl">Total por forma de pagamento</p>
          {Object.entries(totals).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4 w-max-[300px]">
              <p>{key}</p>
              <p>R$ {parseFloat(value).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
