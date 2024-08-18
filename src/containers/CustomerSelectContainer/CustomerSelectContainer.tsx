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

import useStore, { Store } from "@/store/store"

const CustomerSelectContainer = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const customerSelected = useStore((state: Store) => state.customerSelected)
  const saleSelected = useStore((state: Store) => state.saleSelected)

  //esperar pra testar next 15 novos hooks
  const returnCustomers = useCallback(async () => {
    const response = await fetch("/api/customers?orderBy=name")
    const customersRep = await response.json()
    setCustomers(customersRep)
  }, [])

  const setCustomerSelectedById = useCallback(
    (id: string) => {
      const customerSelected: Customer | undefined = customers.find(
        (customer) => customer.id === parseInt(id)
      )
      useStore.getState().setCustomerSelected(customerSelected ?? null)
    },
    [customers]
  )

  useEffect(() => {
    returnCustomers()
  }, [returnCustomers])

  useEffect(() => {
    if (saleSelected && saleSelected.customerId) {
      setCustomerSelectedById(saleSelected.customerId.toString())
    }
  }, [saleSelected, setCustomerSelectedById])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="flex gap-2 items-center">
          <PersonIcon /> Selecione o cliente
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

            <div
              className="border border-input bg-background 
            shadow-sm hover:bg-accent hover:text-accent-foreground 
            rounded p-4 gap-2 flex flex-col justify-center my-2 tracking-wide"
            >
              <ul>
                <h1 className="font-bold mb-2 flex gap-2 text-primary">
                  <PersonIcon /> Cliente Selecionado
                </h1>
                {customerSelected &&
                  Object.keys(customerSelected).map((key, index) => (
                    <li key={index}>
                      <span className="font-bold mr-2">{key}:</span>
                      <span>
                        {customerSelected[
                          key as keyof typeof customerSelected
                        ] === null
                          ? "-"
                          : customerSelected[
                              key as keyof typeof customerSelected
                            ]?.toLocaleString()}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default CustomerSelectContainer
