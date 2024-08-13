"use client"
import { Customer } from "@prisma/client"

import { PersonIcon } from "@radix-ui/react-icons"
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

import useStore from "@/store/store"

const CustomerSelectContainer = () => {
  const [customers, setCustomers] = useState<Customer[]>([])

  //esperar pra testar next 15 novos hooks
  const returnCustomers = useCallback(async () => {
    const response = await fetch("/api/customers?orderBy=name")
    const customersRep = await response.json()
    setCustomers(customersRep)
  }, [])

  const setCustomerSelectedById = (id: string) => {
    const customerSelected: Customer | undefined = customers.find(
      (customer) => customer.id === parseInt(id)
    )
    useStore.getState().setCustomerSelected(customerSelected ?? null)
  }

  useEffect(() => {
    returnCustomers()
  }, [returnCustomers])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="flex gap-2 items-center">
          <PersonIcon /> Selecione o cliente{" "}
        </Button>
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
              onSelect={setCustomerSelectedById}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default CustomerSelectContainer
