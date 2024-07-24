"use client"
import { useEffect } from "react"

interface PageProps {
  params: { id: string }
}

export default function SalePage({ params }: PageProps) {
  /*
  TODO: 
  Rota para buscar os clientes
  Rota para buscar os Produtos
  Rota para adicionar os produtos
  Rota para adicionar o cliente

  Rota para buscar a venda

  Rota para finalizar a venda
  
  */
  const registerSale = async () => {
    if (params.id == "new") {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numberItems: 0,
          paymentMethod: null,
          totalPrice: 0,
          finalDate: null,
        }),
      })

      const data = await response.json()
      console.log(data)
    }
  }

  useEffect(() => {
    registerSale()
  }, [])

  return (
    <div className="flex gap-4 p-8 items-center justify-center">
      <div>Selecione o cliente</div>
      <div>Selecione o produto</div>
      <div>Lista de produtos</div>
      <div>Finalizar venda</div>
    </div>
  )
}
