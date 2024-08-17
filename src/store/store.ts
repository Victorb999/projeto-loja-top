import { ItemProduct } from "@/types/types"
import { Customer, Product, Sale } from "@prisma/client"
import { create } from "zustand"

export type Store = {
  customerSelected: Customer | null
  productsSelected: Product[]
  itemsProductsSelected: ItemProduct[]
  saleSelected: Sale | null
  setCustomerSelected: (customerSelected: Customer | null) => void
  setProductsSelected: (productsSelected: Product[]) => void
  removeProductSelected: (productSelected: Product) => void
  setItemProductsSelected: (itemProductsSelected: ItemProduct[]) => void
  removeItemProductsSelected: (id: number) => void
  setSaleSelected: (saleSelected: Sale | null) => void
}

const useStore = create<Store>(
  (set): Store => ({
    customerSelected: null,
    productsSelected: [],
    itemsProductsSelected: [],
    saleSelected: null,
    setCustomerSelected: (customerSelected: Customer | null) =>
      set((state: Store) => ({
        ...state,
        customerSelected,
      })),
    setProductsSelected: (productsSelected: Product[]) =>
      set((state: Store) => ({
        ...state,
        productsSelected,
      })),
    removeProductSelected: (productSelected: Product) =>
      set((state: Store) => ({
        ...state,
        productsSelected: state.productsSelected.filter(
          (product) => product.id !== productSelected.id
        ),
      })),
    setItemProductsSelected: (itemsProductsSelected: ItemProduct[]) =>
      set((state: Store) => ({
        ...state,
        itemsProductsSelected,
      })),
    removeItemProductsSelected: (id: number) =>
      set((state: Store) => ({
        ...state,
        itemsProductsSelected: state.itemsProductsSelected.filter(
          (itemsProductsSelected) => itemsProductsSelected.id !== id
        ),
      })),
    setSaleSelected: (saleSelected: Sale | null) =>
      set((state: Store) => ({
        ...state,
        saleSelected,
      })),
  })
)
export default useStore
