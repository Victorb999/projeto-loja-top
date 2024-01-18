// pages/api/insertCliente.js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  //if (req.method === "POST") {
  try {
    const novoCliente = await prisma.cliente.create({
      data: {
        Nome: "Cliente Teste",
        Sexo: "M",
        DataNascimento: new Date("1990-01-01"),
        RGIE: "123456789",
        CPFCNPJ: "12345678901",
        DataCadastro: new Date(),
        Telefone1: "12345678901",
        Telefone2: "98765432109",
        Telefone3: "99999999999",
        Email: "cliente@teste.com",
        CEP: "12345678",
        Endereco: "Rua Teste",
        Numero: "123",
        Complemento: "Apto 456",
        Bairro: "Centro",
        Cidade: "Cidade Teste",
        UF: "SP",
        Limite: 1000.0,
        Saldo: 0.0,
        Bloqueado: false,
        Vencimento: 5,
        UltimaCompra: new Date(),
        Excluido: false,
      },
    });

    res
      .status(200)
      .json({ message: "Registro inserido com sucesso", novoCliente });
  } catch (error) {
    console.error("Erro ao inserir registro:", error);
    res.status(500).json({ error: "Erro ao inserir registro" });
  }
  // } else {
  //  res.status(405).json({ error: "Método não permitido" });
  // }
}
