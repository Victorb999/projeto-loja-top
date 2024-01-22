"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PageProps {
  params: { slug: string };
}

const costumerSchema = z.object({
  Nome: z.string().min(1, { message: "Nome obrigatório" }),
  RGIE: z.string().min(1, { message: "RG obrigatório" }),
  DataNascimento: z.coerce.date(),
  RGIE: z.string(),
  CPFCNPJ: z.string(),
  Telefone1: z.string(),
  Telefone2: z.string(),
  Telefone3: z.string(),
  Email: z.string(),
  CEP: z.string(),
  Endereco: z.string(),
  Numero: z.string(),
  Complemento: z.string(),
  Bairro: z.string(),
  Cidade: z.string(),
  UF: z.string(),
  Limite: z.coerce.number(),
  Saldo: z.coerce.number(),
});

type Customer = z.infer<typeof costumeSchema>;

export default function CustomersPage({ params }: PageProps) {
  const { register, handleSubmit, formState } = useForm<Customer>({
    resolver: zodResolver(costumerSchema),
  });
  const handleSubmitForm = async (data: Costumer) => {
    console.log("data", data);
    try {
      await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Redirecionar para a lista de clientes após o cadastro
      //window.location.href = "/customers";
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      // Lógica para lidar com o erro (exibir mensagem ao usuário, por exemplo)
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Novo Cliente</h1>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="max-w-md mx-auto flex flex-col gap-4"
      >
        <div>
          <label htmlFor="Nome" className="block text-gray-200 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="Nome"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Nome")}
          />
        </div>

        <div>
          <label
            htmlFor="CPFCNPJ"
            className="block text-gray-200 font-bold mb-2"
          >
            CPF/CNPJ:
          </label>
          <input
            type="text"
            id="CPFCNPJ"
            className="w-full border p-2 rounded text-gray-900"
            {...register("CPFCNPJ")}
          />
        </div>

        <div>
          <label htmlFor="RGIE" className="block text-gray-200 font-bold mb-2">
            RG:
          </label>
          <input
            type="text"
            id="RGIE"
            className="w-full border p-2 rounded text-gray-900"
            {...register("RGIE")}
          />
        </div>

        <div>
          <label
            htmlFor="DataNascimento"
            className="block text-gray-200 font-bold mb-2"
          >
            Data Nascimento:
          </label>
          <input
            type="date"
            id="DataNascimento"
            name="DataNascimento"
            className="w-full border p-2 rounded text-gray-900"
            {...register("DataNascimento")}
          />
        </div>

        <div>
          <label
            htmlFor="Telefone1"
            className="block text-gray-200 font-bold mb-2"
          >
            Celular/whatsapp:
          </label>
          <input
            type="text"
            id="Telefone1"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Telefone1")}
          />
        </div>

        <div>
          <label
            htmlFor="Telefone2"
            className="block text-gray-200 font-bold mb-2"
          >
            Telefone:
          </label>
          <input
            type="text"
            id="Telefone2"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Telefone2")}
          />
        </div>

        <div>
          <label
            htmlFor="Telefone3"
            className="block text-gray-200 font-bold mb-2"
          >
            Telefone 3:
          </label>
          <input
            type="text"
            id="Telefone3"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Telefone3")}
          />
        </div>

        <div>
          <label htmlFor="Email" className="block text-gray-200 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="Email"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Email")}
          />
        </div>

        <div>
          <label htmlFor="CEP" className="block text-gray-200 font-bold mb-2">
            CEP:
          </label>
          <input
            type="text"
            id="CEP"
            className="w-full border p-2 rounded text-gray-900"
            {...register("CEP")}
          />
        </div>

        <div>
          <label
            htmlFor="Endereco"
            className="block text-gray-200 font-bold mb-2"
          >
            Endereço:
          </label>
          <input
            type="text"
            id="Endereco"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Endereco")}
          />
        </div>

        <div>
          <label
            htmlFor="Numero"
            className="block text-gray-200 font-bold mb-2"
          >
            Número:
          </label>
          <input
            type="text"
            id="Numero"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Numero")}
          />
        </div>

        <div>
          <label
            htmlFor="Complemento"
            className="block text-gray-200 font-bold mb-2"
          >
            Complemento:
          </label>
          <input
            type="text"
            id="Complemento"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Complemento")}
          />
        </div>

        <div>
          <label
            htmlFor="Bairro"
            className="block text-gray-200 font-bold mb-2"
          >
            Bairro:
          </label>
          <input
            type="text"
            id="Bairro"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Bairro")}
          />
        </div>

        <div>
          <label
            htmlFor="Cidade"
            className="block text-gray-200 font-bold mb-2"
          >
            Cidade:
          </label>
          <input
            type="text"
            id="Cidade"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Cidade")}
          />
        </div>

        <div>
          <label htmlFor="UF" className="block text-gray-200 font-bold mb-2">
            UF:
          </label>
          <input
            type="text"
            id="UF"
            className="w-full border p-2 rounded text-gray-900"
            {...register("UF")}
          />
        </div>

        <div>
          <label
            htmlFor="Limite"
            className="block text-gray-200 font-bold mb-2"
          >
            Limite:
          </label>
          <input
            type="number"
            id="Limite"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Limite")}
          />
        </div>

        <div>
          <label htmlFor="Saldo" className="block text-gray-200 font-bold mb-2">
            Saldo:
          </label>
          <input
            type="number"
            id="Saldo"
            className="w-full border p-2 rounded text-gray-900"
            {...register("Saldo")}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Cadastrar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
