"use client"
import CustomerSelectContainer from "@/containers/CustomerSelectContainer/CustomerSelectContainer"
import { useCallback, useEffect, useState } from "react"

import useStore, { Store } from "@/store/store"
import ProductSelectContainer from "@/containers/ProductsSelectContainer/ProductsSelectContainer"
import { TableItems } from "@/components/TableItems/TableItems"
import { Button } from "@/components/ui/button"
import { BackpackIcon } from "@radix-ui/react-icons"
import { SelectList } from "@/components/SelectList/SelectList"

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
  const saleSelected = useStore((state: Store) => state.saleSelected)
  const itemsProductsSelected = useStore(
    (state: Store) => state.itemsProductsSelected
  )
  const [paymentMethod, setPaymentMethod] = useState("")

  const registerSale = useCallback(async () => {
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
      console.log("data", data)
      useStore.getState().setSaleSelected(data.newSale)
    } else {
      const response = await fetch(`/api/sales/${params.id}`, {
        method: "GET",
      })
      const data = await response.json()
      useStore.getState().setSaleSelected(data)
    }
  }, [params.id])

  useEffect(() => {
    // console.log("use effect")
    // eslint-disable-next-line react-hooks/exhaustive-deps

    registerSale()
  }, [registerSale])

  const handleFinalizeSale = async () => {
    const numberItem = itemsProductsSelected.length
    const totalPrice = itemsProductsSelected.reduce((acc, item) => {
      return acc + item.price
    }, 0)

    const items = itemsProductsSelected.map((item) => {
      return {
        productId: item.id,
        saleId: saleSelected?.id,
        quantity: item.quantity,
        unitaryPrice: item.price,
        totalPrice: item.price * item.quantity,
      }
    })

    const saleObj = {
      id: saleSelected?.id,
      customerId: customerSelected?.id ?? null,
      numberItems: numberItem,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      items: items,
    }

    try {
      const response = await fetch(`/api/sale/${saleSelected?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleObj),
      })
      const data = await response.json()
      console.log(data)
      // TODO FINALIZAR A VENDA
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error)
    }
  }

  const paymentMethods = [
    { name: "Cartão de Crédito", id: `card` },
    { name: "Dinheiro", id: `cash` },
    { name: "Pix", id: `pix` },
  ]

  return (
    <div className="flex flex-col gap-4 p-8 items-center justify-center">
      <section className="flex gap-4">
        <div>
          <CustomerSelectContainer />
        </div>
        <div>
          <ProductSelectContainer />
        </div>
      </section>
      <section>
        <div>
          {customerSelected && (
            <div
              className="border border-input bg-background 
            shadow-sm hover:bg-accent hover:text-accent-foreground 
            rounded p-4 gap-2 flex justify-center my-2 tracking-wide"
            >
              <h1>Cliente selecionado:</h1>
              <h1 className="text-primary">{customerSelected.name}</h1>
            </div>
          )}
          {itemsProductsSelected.length === 0 ? (
            <p>Nenhum item selecionado</p>
          ) : (
            <>
              <h1 className="text-xl text-white mb-2">Produtos selecionados</h1>
              <TableItems
                items={itemsProductsSelected}
                removeItem={useStore.getState().removeItemProductsSelected}
              />
            </>
          )}
        </div>
        <div className="flex justify-end my-4">
          <SelectList
            items={paymentMethods}
            onSelect={setPaymentMethod}
            placeholder={"Método de pagamento"}
          />
          <Button
            variant="default"
            className="flex gap-2 items-center"
            onClick={handleFinalizeSale}
          >
            <BackpackIcon /> Finalizar venda
          </Button>
        </div>
      </section>
    </div>
  )
}
