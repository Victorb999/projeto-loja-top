"use client"
import { Product } from "@prisma/client"

import { SketchLogoIcon } from "@radix-ui/react-icons"
import { SelectList } from "@/components/SelectList/SelectList"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

import useStore, { Store } from "@/store/store"
import { Input } from "@/components/ui/input"
import { TableItems } from "@/components/TableItems/TableItems"

const ProductSelectContainer = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [productId, setProductId] = useState<string | null>(null)
  const [quant, setQuant] = useState<number>(0)
  const [productSelected, setProductSelected] = useState<Product | null>(null)

  // const productsSelected = useStore((state: Store) => state.productsSelected)
  const itemsProductsSelected = useStore(
    (state: Store) => state.itemsProductsSelected
  )

  //esperar pra testar next 15 novos hooks
  const returnProducts = useCallback(async () => {
    const response = await fetch("/api/products?orderBy=name")
    const productsRep = await response.json()
    setProducts(productsRep)
  }, [])

  const setProductSelectedById = () => {
    if (productSelected) {
      /* useStore
        .getState()
        .setProductsSelected([...productsSelected, productSelected]) */

      const itemProduct: ItemProduct = {
        id: productSelected?.id,
        name: productSelected?.name ?? "",
        price: parseFloat(productSelected?.price.toString()) ?? 0,
        quantity: quant,
      }
      console.log(itemProduct, "itemProduct", itemsProductsSelected)

      useStore
        .getState()
        .setItemProductsSelected([...itemsProductsSelected, itemProduct])
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="flex gap-2 items-center">
          <SketchLogoIcon /> Selecione o produto{" "}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Selecione o produto</SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            <SelectList
              items={products.map((product) => ({
                ...product,
                id: product.id.toString(),
              }))}
              placeholder="produto"
              onSelect={setProductId}
            />

            <Input
              value={quant}
              placeholder="Quantidade"
              type="number"
              onChange={(e) => setQuant(parseInt(e.target.value))}
            />

            <span>
              Preço: R$
              {productSelected &&
                parseFloat(productSelected?.price.toString()).toFixed(2)}
            </span>

            <span>
              Total:{" "}
              {productSelected?.price
                ? `R$ ${(
                    parseFloat(productSelected?.price.toString()) * quant
                  ).toFixed(2)}`
                : 0}
            </span>

            <Button onClick={() => setProductSelectedById()}>Adicionar</Button>

            <div>
              {itemsProductsSelected.length === 0 ? (
                <p>Nenhum item selecionado</p>
              ) : (
                <>
                  <h1 className="text-xl text-white mb-2">
                    Produtos selecionados
                  </h1>
                  <TableItems
                    items={itemsProductsSelected}
                    removeItem={useStore.getState().removeItemProductsSelected}
                  />
                </>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default ProductSelectContainer
