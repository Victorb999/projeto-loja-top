import { Sale } from "@prisma/client"

export interface ItemProduct {
  id: number
  name: string
  price: number
  quantity: number
}

export interface SaleListInterface {
  id: number
  customerId: number | null
  numberItems: number
  paymentMethod: string | null
  totalPrice: string
  createdAt: Date
  finalDate: Date | null
  Customer: {
    name: string
  } | null
}
