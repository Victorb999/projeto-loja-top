"use client"
import { TableProducts } from "@/components/TableProducts/TableProducts"
import { Input } from "@/components/ui/input"
import { useProduct } from "@/hooks/useProduct"

interface Product {
  id: number
  name: string
  price: string
  priceSpend: string
  codeBar: string
  description: string
  active: boolean
}

interface Props {
  products: Product[]
}

export const ProductList = ({ products }: Props) => {
  const { filteredProducts, filterProductsByName, deleteProductRequest } =
    useProduct(products)

  console.log("filteredProducts", filteredProducts)
  return (
    <div>
      <Input
        type="text"
        placeholder="Filter by name"
        className="mb-4 w-1/2"
        onChange={(e) => filterProductsByName(e.target.value)}
      />
      <TableProducts
        products={filteredProducts}
        deleteProductRequest={deleteProductRequest}
      />
    </div>
  )
}
