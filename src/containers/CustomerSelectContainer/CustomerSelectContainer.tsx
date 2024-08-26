"use client"

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
import { Button } from "@/components/ui/button"

import { useCustomerSelect } from "@/hooks/useCustomerSelect"

const CustomerSelectContainer = () => {
  const {
    customers,
    customerSelected,
    setCustomerSelectedById,
    removeClientSelected,
  } = useCustomerSelect()

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

            {customerSelected && (
              <div
                className="border border-input bg-background 
            shadow-sm hover:bg-accent hover:text-accent-foreground 
            rounded p-4 gap-2 flex flex-col justify-center my-2 tracking-wide"
              >
                <ul>
                  <h1 className="font-bold mb-2 flex gap-2 text-primary">
                    <PersonIcon /> Cliente Selecionado
                  </h1>

                  {Object.keys(customerSelected).map((key, index) => (
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
                <Button
                  variant={"default"}
                  className="w-full"
                  onClick={removeClientSelected}
                >
                  Remover cliente
                </Button>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default CustomerSelectContainer
