import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(req: Request, { params }) {
  const id = params.id;
  try {
    const cliente = await prisma.cliente.delete({
      where: {
        Codigo: parseInt(id),
      },
    });
    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return NextResponse.json({ error: "Erro ao deletar cliente" });
  } finally {
    await prisma.$disconnect();
  }
}
