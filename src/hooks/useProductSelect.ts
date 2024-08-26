import { Item, Product } from "@prisma/client"
import { useState, useCallback, useEffect } from "react"

import useStore, { Store } from "@/store/store"
import { ItemProduct } from "@/types/types"

export const useProductSelect = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [productId, setProductId] = useState<string | null>(null)
  const [quant, setQuant] = useState<number>(1)
  const [productSelected, setProductSelected] = useState<Product | null>(null)
  const saleSelected = useStore((state: Store) => state.saleSelected)

  const itemsProductsSelected = useStore(
    (state: Store) => state.itemsProductsSelected
  )

  //esperar pra testar next 15 novos hooks
  const returnProducts = useCallback(async () => {
    const response = await fetch("/api/products?orderBy=name")
    const productsRep = await response.json()
    setProducts(productsRep)
  }, [])

  const returnItemsProductsSaved = useCallback(async () => {
    const response = await fetch(`/api/items?saleId=${saleSelected?.id}`)
    const itemsResp = await response.json()

    const itemsProductsSelectedBefore = itemsResp.map((item: Item) => {
      return {
        id: item?.productId,
        name:
          products.find((product) => product.id === item?.productId)?.name ??
          "",
        price: parseFloat(item?.unitaryPrice.toString()) ?? 0,
        quantity: item.quantity,
      }
    })

    useStore.getState().setItemProductsSelected(itemsProductsSelectedBefore)
  }, [products, saleSelected?.id])

  const setProductSelectedById = () => {
    if (productSelected) {
      const productAlreadyInTheList = itemsProductsSelected.find(
        (itemsProductsSelected) =>
          itemsProductsSelected.id === productSelected.id
      )
      if (productAlreadyInTheList) {
        const newItemsProductsSelected = itemsProductsSelected.map(
          (itemsProductsSelected) => {
            if (itemsProductsSelected.id === productSelected.id) {
              return {
                ...itemsProductsSelected,
                quantity: itemsProductsSelected.quantity + quant,
              }
            }
            return itemsProductsSelected
          }
        )
        useStore.getState().setItemProductsSelected(newItemsProductsSelected)
      } else {
        const itemProduct: ItemProduct = {
          id: productSelected?.id,
          name: productSelected?.name ?? "",
          price: parseFloat(productSelected?.price.toString()) ?? 0,
          quantity: quant,
        }

        useStore
          .getState()
          .setItemProductsSelected([...itemsProductsSelected, itemProduct])
      }
    }
  }

  useEffect(() => {
    returnProducts()
  }, [returnProducts])

  useEffect(() => {
    setQuant(1)
    if (productId) {
      const productSelectedFiltered: Product | undefined = products.find(
        (product) => product.id === parseInt(productId)
      )
      productSelectedFiltered && setProductSelected(productSelectedFiltered)
    }
  }, [productId, products])

  useEffect(() => {
    saleSelected && returnItemsProductsSaved()
    saleSelected && returnItemsProductsSaved()
  }, [saleSelected, returnItemsProductsSaved])

  return {
    products,
    productId,
    quant,
    itemsProductsSelected,
    productSelected,
    setProductId,
    setQuant,
    setProductSelectedById,
  }
}
