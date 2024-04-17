import prisma from "../../lib/prisma";
import { Cliente } from "@prisma/client";

import { TableCustomers } from "@/src/components/TableCustomers/TableCustomers";

const Customers = async () => {
  const customers: Cliente[] = await prisma.cliente.findMany({
    where: { Excluido: false },
  });

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold mb-8">Lista de Clientes</h1>
      <a
        className="bg-violet-500 hover:bg-violet-700 
      text-white font-bold py-2 px-4 rounded w-40 text-center"
        href="/customer/new"
      >
        + Novo cliente
      </a>
      <TableCustomers customers={customers} />
    </div>
  );
};

export default Customers;
