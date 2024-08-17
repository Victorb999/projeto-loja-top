import { useCallback, useEffect, useState } from "react"

import useStore, { Store } from "@/store/store"

interface SaleProps {
  id: string
}
export const useSale = ({ id }: SaleProps) => {
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
    if (id == "new") {
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
      const response = await fetch(`/api/sales/${id}`, {
        method: "GET",
      })
      const data = await response.json()
      useStore.getState().setSaleSelected(data)
    }
  }, [id])

  useEffect(() => {
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

      alert("Venda finalizada com sucesso!")
      window.location.href = "/sales"
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error)
    }
  }

  const paymentMethods = [
    { name: "Cartão de Crédito", id: `cartao` },
    { name: "Dinheiro", id: `dinheiro` },
    { name: "Pix", id: `pix` },
  ]

  const disableButtonFinish =
    customerSelected === null ||
    saleSelected === null ||
    itemsProductsSelected.length === 0 ||
    paymentMethod === ""

  return {
    customerSelected,
    saleSelected,
    itemsProductsSelected,
    paymentMethods,
    paymentMethod,
    setPaymentMethod,
    disableButtonFinish,
    handleFinalizeSale,
    removeItemProductsSelected: useStore.getState().removeItemProductsSelected,
  }
}
