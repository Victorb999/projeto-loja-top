"use client"
import { useState } from "react"
import { DeleteButton } from "@/components/DeleteButton/DeleteButton"
import { EditButton } from "@/components/EditButton/EditButton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

export const TableProducts = ({ products }: Props) => {
  const [productsState, setProductsState] = useState(products)

  const handleDelete = (id: number) => {
    const filteredProducts = productsState.filter(
      (product) => product.id !== id
    )
    setProductsState(filteredProducts)
  }

  const deleteProductRequest = async (id: number) => {
    try {
      await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      handleDelete(id)
      alert("Product deleted successfully")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Table className="min-w-full rounded overflow-hidden">
        <TableHeader>
          <TableRow className="bg-purple-500">
            <TableHead className="text-white">Código</TableHead>
            <TableHead className="text-white">Nome</TableHead>
            <TableHead className="text-white">Preço</TableHead>
            <TableHead className="text-white">Preço de Custo</TableHead>
            <TableHead className="text-white">Código de Barras</TableHead>
            <TableHead className="text-white">Descrição</TableHead>
            <TableHead className="text-white">Ativo</TableHead>
            <TableHead className="text-white">Editar</TableHead>
            <TableHead className="text-white">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsState.map((product: Product) => (
            <TableRow
              key={product.id}
              className="text-gray-200 border-y cursor-pointer"
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {parseFloat(product.price.toString()).toFixed(2)}
              </TableCell>
              <TableCell>
                {parseFloat(product.priceSpend.toString()).toFixed(2)}
              </TableCell>
              <TableCell>{product.codeBar}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.active ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <EditButton url={`/product/${product.id}`} />
              </TableCell>
              <TableCell>
                <DeleteButton
                  id={product.id}
                  deleteRequest={deleteProductRequest}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
