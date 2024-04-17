"use client";
import { Cliente } from "@prisma/client";
import { useState } from "react";
import { DeleteCustomer } from "@/src/components/DeleteCustomer/DeleteCustomer";
import { Costumer } from "@/types/Costumer";

interface Props {
  customers: Costumer[];
}

export const TableCustomers = ({ customers }: Props) => {
  const [costumersState, setCostumersState] = useState(customers);

  const handleDelete = (id: number) => {
    const filteredCostumer = costumersState.filter(
      (costumer) => costumer.Codigo !== id,
    );
    setCostumersState(filteredCostumer);
  };
  return (
    <table className="min-w-full rounded-lg overflow-hidden">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="py-2 px-4">Código</th>
          <th className="py-2 px-4">Nome</th>
          <th className="py-2 px-4">CPF/CNPJ</th>
          <th className="py-2 px-4">Telefone</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Limite</th>
          <th className="py-2 px-4">Saldo</th>
          <th className="py-2 px-4">Bloqueado</th>
          <th className="py-2 px-4">Vencimento</th>
          <th className="py-2 px-4">Delete</th>
        </tr>
      </thead>
      <tbody>
        {costumersState.map((customer: Costumer) => (
          <tr key={customer.Codigo} className="text-gray-200 border-y">
            <td className="py-2 px-4 border-x">{customer.Codigo}</td>
            <td className="py-2 px-4 border-r">{customer.Nome}</td>
            <td className="py-2 px-4 border-r">{customer.CPFCNPJ}</td>
            <td className="py-2 px-4 border-r">{customer.Telefone1}</td>
            <td className="py-2 px-4 border-r">{customer.Email}</td>
            <td className="py-2 px-4 border-r">
              {customer.Limite?.toString()}
            </td>
            <td className="py-2 px-4 border-r">{customer.Saldo?.toString()}</td>
            <td className="py-2 px-4 border-r">
              {customer.Bloqueado ? "Sim" : "Não"}
            </td>
            <td className="py-2 px-4 border-r">{customer.Vencimento}</td>
            <td className="py-2 px-4 border-x">
              <DeleteCustomer
                id={customer.Codigo}
                removeCustomer={handleDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
