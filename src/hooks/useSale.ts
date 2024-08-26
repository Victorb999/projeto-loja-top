import { useCallback, useEffect, useState } from "react"

import useStore, { Store } from "@/store/store"
import { useToast } from "@/components/ui/use-toast"

interface SaleProps {
  id: string
}
export const useSale = ({ id }: SaleProps) => {
  //esperar pra testar next 15 novos hooks
  const { toast } = useToast()

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

      useStore.getState().setSaleSelected(data.newSale)
    } else {
      const response = await fetch(`/api/sale/${id}`, {
        method: "GET",
      })
      const data = await response.json()
      useStore.getState().setSaleSelected(data)
    }
  }, [id])

  /* useEffect(() => {
    registerSale()
  }, [registerSale])
 */
  const handleFinalizeSale = async (onlySave = false) => {
    registerSale()
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
      finalDate: onlySave ? null : new Date(),
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

      if (!onlySave) {
        toast({
          title: "Venda finalizada com sucesso!",
          description: "Boa!!",
        })
        window.location.href = "/sales"
      } else {
        toast({
          title: "Venda salva com sucesso!",
          description: "Salvamos sua venda no sistema.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao cadastrar venda",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const paymentMethods = [
    { name: "Cartão de Crédito", id: `cartao` },
    { name: "Dinheiro", id: `dinheiro` },
    { name: "Pix", id: `pix` },
  ]

  const disableButtonFinish =
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
