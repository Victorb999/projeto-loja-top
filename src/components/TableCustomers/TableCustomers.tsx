"use client"
import { useState } from "react"
import { DeleteCustomer } from "@/src/components/DeleteCustomer/DeleteCustomer"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import { Cliente } from "@prisma/client"
import { ProfileCustomer } from "../ProfileCustomer/ProfileCustomer"
import { Button } from "../ui/button"

import { Pencil1Icon } from "@radix-ui/react-icons"

interface Props {
  customers: Cliente[]
}

export const TableCustomers = ({ customers }: Props) => {
  const [customersState, setCustomersState] = useState(customers)

  const handleDelete = (id: number) => {
    const filteredCustomer = customersState.filter(
      (customer) => customer.Codigo !== id
    )
    setCustomersState(filteredCustomer)
  }
  return (
    <>
      <Table className="min-w-full rounded overflow-hidden">
        <TableHeader>
          <TableRow className="bg-purple-500">
            <TableHead className="text-white">Detalhes</TableHead>
            <TableHead className="text-white">Código</TableHead>
            <TableHead className="text-white">Nome</TableHead>
            <TableHead className="text-white">CPF/CNPJ</TableHead>
            <TableHead className="text-white">Telefone</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Editar</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersState.map((customer: Cliente) => (
            <TableRow
              key={customer.Codigo}
              className="text-gray-200 border-y cursor-pointer"
            >
              <TableCell className="flex justify-center">
                <ProfileCustomer customer={customer} />
              </TableCell>
              <TableCell>{customer.Codigo}</TableCell>
              <TableCell>{customer.Nome}</TableCell>
              <TableCell>{customer.CPFCNPJ}</TableCell>
              <TableCell>{customer.Telefone1}</TableCell>
              <TableCell>{customer.Email}</TableCell>
              <TableCell>
                <Button variant="secondary" asChild>
                  <a href={`/customer/${customer.Codigo}`}>
                    <Pencil1Icon />
                  </a>
                </Button>
              </TableCell>
              <TableCell>
                <DeleteCustomer
                  id={customer.Codigo}
                  removeCustomer={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
