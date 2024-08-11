import { Customer, Product } from "@prisma/client"
import { create } from "zustand"

export type Store = {
  customerSelected: Customer | null
  productsSelected: Product[]
  itemsProductsSelected: ItemProduct[]
  setCustomerSelected: (customerSelected: Customer | null) => void
  setProductsSelected: (productsSelected: Product[]) => void
  removeProductSelected: (productSelected: Product) => void
  setItemProductsSelected: (itemProductsSelected: ItemProduct[]) => void
  removeItemProductsSelected: (itemProductsSelected: ItemProduct) => void
}

const useStore = create<Store>(
  (set): Store => ({
    customerSelected: null,
    productsSelected: [],
    itemsProductsSelected: [],
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
    removeItemProductsSelected: (itemsProductSelected: ItemProduct) =>
      set((state: Store) => ({
        ...state,
        itemsProductsSelected: state.itemsProductsSelected.filter(
          (itemsProductsSelected) =>
            itemsProductsSelected.id !== itemsProductSelected.id
        ),
      })),
  })
)
export default useStore
