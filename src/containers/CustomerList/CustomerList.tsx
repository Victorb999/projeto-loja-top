"use client"
import { TableCustomers } from "@/components/TableCustomers/TableCustomers"
import { Input } from "@/components/ui/input"
import { useCustomer } from "@/hooks/useCustomer"

import { Customer } from "@prisma/client"

interface Props {
  customers: Customer[]
}

export const CustomerList = ({ customers }: Props) => {
  const { filteredCustomers, filterCustomersByName, deleteCustomerRequest } =
    useCustomer(customers)

  console.log("filteredCustomers", filteredCustomers)
  return (
    <div>
      <Input
        type="text"
        placeholder="Filter by name"
        className="mb-4 w-1/2"
        onChange={(e) => filterCustomersByName(e.target.value)}
      />
      <TableCustomers
        customers={filteredCustomers}
        deleteCustomerRequest={deleteCustomerRequest}
      />
    </div>
  )
}
