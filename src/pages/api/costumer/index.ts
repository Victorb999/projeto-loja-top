// pages/api/getCustomers.js
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const customers = await prisma.cliente.findMany();
      res.status(200).json(customers);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
