import prisma from "../../lib/prisma";

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
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-r">Código</th>
            <th className="py-2 px-4 border-r">Nome</th>
            <th className="py-2 px-4 border-r">CPF/CNPJ</th>
            <th className="py-2 px-4 border-r">Telefone</th>
            <th className="py-2 px-4 border-r">Email</th>
            <th className="py-2 px-4 border-r">Limite</th>
            <th className="py-2 px-4 border-r">Saldo</th>
            <th className="py-2 px-4 border-r">Bloqueado</th>
            <th className="py-2 px-4 border-r">Vencimento</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.Codigo} className="text-gray-200">
              <td className="py-2 px-4 border-r">{customer.Codigo}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
