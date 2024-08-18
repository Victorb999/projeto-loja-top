import useStore, { Store } from "@/store/store"
import { Customer } from "@prisma/client"
import { useState, useCallback, useEffect } from "react"

export const useCustomerSelect = () => {
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

  return { customers, customerSelected, setCustomerSelectedById }
}
