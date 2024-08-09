"use client"
import { Customer } from "@prisma/client"

import { SelectList } from "@/components/SelectList/SelectList"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const CustomerSelectContainer = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  //esperar pra testar next 15 novos hooks
  const returnCustomers = useCallback(async () => {
    const response = await fetch("/api/customers?orderBy=name")
    const customersRep = await response.json()
    console.log(customersRep)
    setCustomers(customersRep)
  }, [])

  useEffect(() => {
    returnCustomers()
  }, [returnCustomers])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button> Selecione o cliente </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Selecione o cliente</SheetTitle>
          <SheetDescription>
            <SelectList
              items={customers.map((customer) => ({
                ...customer,
                id: customer.id.toString(),
              }))}
              placeholder="Cliente"
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default CustomerSelectContainer
