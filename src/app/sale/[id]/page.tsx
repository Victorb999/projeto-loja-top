"use client"
import CustomerSelectContainer from "@/containers/CustomerSelectContainer/CustomerSelectContainer"
import { Suspense, useEffect } from "react"

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
  //esperar pra testar next 15 novos hooks
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
    //registerSale()
    console.log("use effect")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex gap-4 p-8 items-center justify-center">
      <div>
        <CustomerSelectContainer />
      </div>
      <div>Selecione o produto</div>
      <div>Lista de produtos</div>
      <div>Finalizar venda</div>
    </div>
  )
}
