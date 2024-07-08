"use client";
import { useState } from "react";
import { DeleteCustomer } from "@/src/components/DeleteCustomer/DeleteCustomer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Cliente } from "@prisma/client";
import { ProfileCustomer } from "../ProfileCustomer/ProfileCustomer";
import { Button } from "../ui/button";

interface Props {
  customers: Cliente[];
}

export const TableCustomers = ({ customers }: Props) => {
  const [customersState, setCustomersState] = useState(customers);

  const handleDelete = (id: number) => {
    const filteredCustomer = customersState.filter(
      (customer) => customer.Codigo !== id
    );
    setCustomersState(filteredCustomer);
  };
  return (
    <>
      <Table className="min-w-full rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-200 text-gray-700">
          <TableRow>
            <TableHead>Detalhes</TableHead>
            <TableHead>Código</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersState.map((customer: Cliente) => (
            <TableRow
              key={customer.Codigo}
              className="text-gray-200 border-y cursor-pointer"
            >
              <TableCell>
                <ProfileCustomer customer={customer} />
              </TableCell>
              <TableCell>{customer.Codigo}</TableCell>
              <TableCell>{customer.Nome}</TableCell>
              <TableCell>{customer.CPFCNPJ}</TableCell>
              <TableCell>{customer.Telefone1}</TableCell>
              <TableCell>{customer.Email}</TableCell>
              <TableCell>
                <Button variant="secondary" asChild>
                  <a href={`/customer/${customer.Codigo}`}>Editar</a>
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
  );
};
