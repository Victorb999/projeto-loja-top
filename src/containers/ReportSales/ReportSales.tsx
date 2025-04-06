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
          <div className="flex gap-4 ">
            {Object.entries(totals).map(([key, value]: any) => (
              <div
                key={key}
                className="flex items-center gap-4 w-max-[300px] border rounded p-4 flex-col"
              >
                <h1 className="text-xl font-bold text-purple-500">{key}</h1>
                <h2 className="text-xl font-bold ">
                  R$ {parseFloat(value).toFixed(2)}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
