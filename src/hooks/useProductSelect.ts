import { Item, Product } from "@prisma/client"
import { useState, useCallback, useEffect } from "react"

import useStore, { Store } from "@/store/store"
import { ItemProduct } from "@/types/types"

export const useProductSelect = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [productId, setProductId] = useState<string | null>(null)
  const [quant, setQuant] = useState<number>(0)
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
    console.log("saleSelected?.id", saleSelected?.id)
    const response = await fetch(`/api/items?saleId=${saleSelected?.id}`)
    const itemsResp = await response.json()
    console.log("itemsResp", itemsResp)

    const productsSelectedBefore = products.filter((product) => {
      return (
        product.id ===
        itemsResp?.find((item: Item) => item.productId === product.id)
          ?.productId
      )
    })
    //TODO WIP
    /* const itemsProductsSelectedBefore = productsSelectedBefore.map(
      (product) => {
        return {
          id: product?.id,
          name: product?.name ?? "",
          price: parseFloat(product?.price.toString()) ?? 0,
          quantity: itemsResp,
        }
      }
    )

    useStore
      .getState()
      .setItemProductsSelected([...itemsProductsSelected, itemProduct]) 

    useStore.getState().setItemProductsSelected(productsSelectedBefore)*/
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
    setQuant(0)
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
