"use client"
import CustomerSelectContainer from "@/containers/CustomerSelectContainer/CustomerSelectContainer"
import { Suspense, useEffect } from "react"

import useStore, { Store } from "@/store/store"
import ProductSelectContainer from "@/containers/ProductsSelectContainer/ProductsSelectContainer"

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

  const customerSelected = useStore((state: Store) => state.customerSelected)
  const productsSelected = useStore((state: Store) => state.productsSelected)

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
        {customerSelected && (
          <h1>Cliente selecionado: {customerSelected.name}</h1>
        )}
      </div>
      <div>
        <ProductSelectContainer />
        {productsSelected.length > 0 && (
          <div>
            <h1>Produtos selecionados</h1>
            <ul>
              {productsSelected.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>Lista de produtos</div>
      <div>Finalizar venda</div>
    </div>
  )
}
