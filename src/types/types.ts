import { Sale } from "@prisma/client"

export interface ItemProduct {
  id: number
  name: string
  price: number
  quantity: number
}

export interface SaleListInterface {
  sales: (Sale & {
    Customer: {
      name: string
    } | null
  })[]
}
