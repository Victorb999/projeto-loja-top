import prisma from "../../lib/prisma";
import { DeleteCustomer } from "../../components/DeleteCustomer/DeleteCustomer";

const Customers = async () => {
  const customers = await prisma.cliente.findMany({
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
      <table className="min-w-full rounded-lg overflow-hidden">
        {" "}
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
          {customers.map((customer) => (
            <tr key={customer.Codigo} className="text-gray-200 border-y">
              <td className="py-2 px-4 border-x">{customer.Codigo}</td>
              <td className="py-2 px-4 border-r">{customer.Nome}</td>
              <td className="py-2 px-4 border-r">{customer.CPFCNPJ}</td>
              <td className="py-2 px-4 border-r">{customer.Telefone1}</td>
              <td className="py-2 px-4 border-r">{customer.Email}</td>
              <td className="py-2 px-4 border-r">
                {customer.Limite?.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-r">
                {customer.Saldo?.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-r">
                {customer.Bloqueado ? "Sim" : "Não"}
              </td>
              <td className="py-2 px-4 border-r">{customer.Vencimento}</td>
              <td className="py-2 px-4 border-x">
                <DeleteCustomer id={customer.Codigo} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
