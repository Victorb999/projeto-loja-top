// pages/api/getCustomers.js
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const customers = await prisma.cliente.findMany();
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar clientes" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const novoCliente = await prisma.cliente.create({
      data: body,
    });

    return NextResponse.json({
      message: "Registro inserido com sucesso",
      novoCliente,
    });
  } catch (error) {
    console.error("Erro ao inserir registro:", error);
    return NextResponse.json({ error: "Erro ao inserir registro" });
  } finally {
    await prisma.$disconnect();
  }
}
