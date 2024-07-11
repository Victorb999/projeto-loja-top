"use client";
import { useState } from "react";
import { Costumer } from "@prisma/client";

import { DeleteButton } from "@/components/DeleteButton/DeleteButton";
import { EditButton } from "@/components/EditButton/EditButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProfileCustomer } from "@/components/ProfileCustomer/ProfileCustomer";

interface Props {
  customers: Costumer[];
}

export const TableCustomers = ({ customers }: Props) => {
  const [customersState, setCustomersState] = useState(customers);

  const handleDelete = (id: number) => {
    const filteredCustomer = customersState.filter(
      (customer) => customer.Codigo !== id
    );
    setCustomersState(filteredCustomer);
  };

  const deleteCustomerRequest = async (id: number) => {
    try {
      await fetch(`/api/customer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleDelete(id);
      alert("Customer deleted successfully");
    } catch (error) {
      alert(error);
    }
  };

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
          {customersState.map((customer: Costumer) => (
            <TableRow
              key={customer.Codigo}
              className="text-gray-200 border-y cursor-pointer"
            >
              <TableCell className="flex justify-center">
                <ProfileCustomer customer={customer} />
              </TableCell>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.cpfcnpj}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                <EditButton url={`/customer/${customer.id}`} />
              </TableCell>
              <TableCell>
                <DeleteButton
                  id={customer.id}
                  deleteRequest={deleteCustomerRequest}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
