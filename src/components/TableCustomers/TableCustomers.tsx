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

interface Props {
  customers: Cliente[];
}

export const TableCustomers = ({ customers }: Props) => {
  const [costumersState, setCostumersState] = useState(customers);

  const handleDelete = (id: number) => {
    const filteredCostumer = costumersState.filter(
      (costumer) => costumer.Codigo !== id
    );
    setCostumersState(filteredCostumer);
  };
  return (
    <Table className="min-w-full rounded-lg overflow-hidden">
      <TableHeader className="bg-gray-200 text-gray-700">
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>CPF/CNPJ</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {costumersState.map((customer: Cliente) => (
          <TableRow key={customer.Codigo} className="text-gray-200 border-y">
            <TableCell>{customer.Codigo}</TableCell>
            <TableCell>{customer.Nome}</TableCell>
            <TableCell>{customer.CPFCNPJ}</TableCell>
            <TableCell>{customer.Telefone1}</TableCell>
            <TableCell>{customer.Email}</TableCell>
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
  );
};
