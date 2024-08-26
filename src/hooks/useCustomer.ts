import { useState } from "react"

import { Customer } from "@prisma/client"
import { useToast } from "@/components/ui/use-toast"

export const useCustomer = (customers: Customer[]) => {
  const { toast } = useToast()
  const [filteredCustomers, setFilteredCustomers] = useState(customers)

  const filterCustomersByName = (name: string) => {
    if (name.length >= 3) {
      const customersFilteredByName = customers.filter((customer) =>
        customer.name.toLowerCase().includes(name.toLowerCase())
      )

      setFilteredCustomers(customersFilteredByName)
    } else if (name.length === 0) {
      // Reset to the original list if the search term is empty
      setFilteredCustomers(customers)
    }
  }

  const handleDelete = (id: number) => {
    const customersWithoutDeleted = filteredCustomers.filter(
      (customer) => customer.id !== id
    )
    setFilteredCustomers(customersWithoutDeleted)
  }

  const deleteCustomerRequest = async (id: number) => {
    try {
      await fetch(`/api/customer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      handleDelete(id)
      toast({
        title: "Cliente Deletado",
        description: "Deletamos esse cliente.",
      })
    } catch (error) {
      toast({
        title: "Ops, algo deu errado",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return {
    filteredCustomers,
    setFilteredCustomers,
    filterCustomersByName,
    deleteCustomerRequest,
    handleDelete,
  }
}
