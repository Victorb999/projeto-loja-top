"use client";
import { useState } from "react";
interface PageProps {
  params: { slug: string };
}

export default function CustomersPage({ params }: PageProps) {
  const [formData, setFormData] = useState({
    Nome: "",
    Sexo: "",
    DataNascimento: new Date("1990-01-01"),
    RGIE: "",
    CPFCNPJ: "",
    Telefone1: "",
    Telefone2: "",
    Telefone3: "",
    Email: "",
    CEP: "",
    Endereco: "",
    Numero: "",
    Complemento: "",
    Bairro: "",
    Cidade: "",
    UF: "",
    Limite: 0,
    Saldo: 0,
    Bloqueado: false,
    Vencimento: 3,
    UltimaCompra: new Date(),
    Excluido: false,
    DataCadastro: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Redirecionar para a lista de clientes após o cadastro
      // window.location.href = "/customers";
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      // Lógica para lidar com o erro (exibir mensagem ao usuário, por exemplo)
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Novo Cliente</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="Nome" className="block text-gray-700 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="Nome"
            name="Nome"
            value={formData.Nome}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
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
