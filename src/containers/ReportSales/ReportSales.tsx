"use client"
import { TableReport } from "@/components/TableReport/TableReport"
import { Input } from "@/components/ui/input"
import { useSaleReport } from "@/hooks/useSaleReport"
import { Label } from "@radix-ui/react-label"
import { useEffect, useRef, useState } from "react"
import { date } from "zod"

export const ReportSales = () => {
  const [params, setParams] = useState({ dateInitial: "", dateFinal: "" })

  const { filteredSales } = useSaleReport({
    params,
  })

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

      {filteredSales && filteredSales.sales.length > 0 && (
        <TableReport sales={filteredSales} />
      )}
    </div>
  )
}
