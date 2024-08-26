"use client"
import CustomerSelectContainer from "@/containers/CustomerSelectContainer/CustomerSelectContainer"

import ProductSelectContainer from "@/containers/ProductsSelectContainer/ProductsSelectContainer"
import { TableItems } from "@/components/TableItems/TableItems"
import { Button } from "@/components/ui/button"
import { BackpackIcon } from "@radix-ui/react-icons"
import { SelectList } from "@/components/SelectList/SelectList"
import { useSale } from "@/hooks/useSale"

interface PageProps {
  params: { id: string }
}

export default function SalePage({ params }: PageProps) {
  const {
    customerSelected,
    itemsProductsSelected,
    paymentMethods,
    setPaymentMethod,
    handleFinalizeSale,
    disableButtonFinish,
    removeItemProductsSelected,
  } = useSale({ id: params.id })

  return (
    <div className="flex flex-col gap-4 p-8 items-center justify-center">
      <section className="flex gap-4 min-h-[8dvh] items-center">
        <div>
          <CustomerSelectContainer />
        </div>
        <div>
          <ProductSelectContainer />
        </div>
      </section>
      <section className="flex flex-col items-center gap-4 min-h-[30dvh]">
        <div className="flex flex-col gap-4 min-h-[40dvh] justify-space-between items-center">
          {customerSelected && (
            <div
              className="border border-input bg-background mb-8
            shadow-sm hover:bg-accent hover:text-accent-foreground 
            rounded p-4 gap-2 flex justify-center my-2 tracking-wide"
            >
              <h1>Cliente selecionado:</h1>
              <h1 className="text-primary">{customerSelected.name}</h1>
            </div>
          )}
          {itemsProductsSelected.length === 0 ? (
            <p className="text-xl text-white mt-8">Nenhum item selecionado</p>
          ) : (
            <>
              <h1 className="text-xl text-white mb-2">Produtos selecionados</h1>
              <TableItems
                items={itemsProductsSelected}
                removeItem={removeItemProductsSelected}
              />
            </>
          )}
        </div>
        <div className="flex justify-end my-4 gap-2">
          <SelectList
            items={paymentMethods}
            onSelect={setPaymentMethod}
            placeholder={"Método de pagamento"}
          />
          <Button
            variant="default"
            className="flex gap-2 items-center"
            onClick={() => handleFinalizeSale(false)}
            disabled={disableButtonFinish}
          >
            <BackpackIcon /> Finalizar venda
          </Button>
          <Button
            variant="secondary"
            className="flex gap-2 items-center"
            onClick={() => handleFinalizeSale(true)}
          >
            <BackpackIcon /> Salvar venda
          </Button>
        </div>
        <Button variant="secondary">
          <a href="/">Voltar</a>
        </Button>
      </section>
    </div>
  )
}
