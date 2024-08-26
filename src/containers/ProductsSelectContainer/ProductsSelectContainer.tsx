"use client"

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

import { Button } from "@/components/ui/button"

import useStore from "@/store/store"
import { Input } from "@/components/ui/input"
import { TableItems } from "@/components/TableItems/TableItems"
import { useProductSelect } from "@/hooks/useProductSelect"

const ProductSelectContainer = () => {
  const {
    products,
    setProductId,
    productSelected,
    quant,
    setQuant,
    itemsProductsSelected,
    setProductSelectedById,
  } = useProductSelect()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="flex gap-2 items-center">
          <SketchLogoIcon /> Selecione o produto
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
              placeholder="Selecione"
              onSelect={setProductId}
            />

            <Input
              value={quant}
              placeholder="Quantidade"
              type="number"
              min={1}
              onChange={(e) => setQuant(parseInt(e.target.value))}
            />

            <span>
              Preço: R$
              {productSelected &&
                parseFloat(productSelected?.price.toString()).toFixed(2)}
            </span>

            <span>
              Total:
              {productSelected?.price
                ? `R$ ${(
                    parseFloat(productSelected?.price.toString()) * quant
                  ).toFixed(2)}`
                : 0}
            </span>

            <Button
              onClick={() => setProductSelectedById()}
              disabled={!productSelected}
            >
              Adicionar
            </Button>

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
