"use client"
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
  deleteProductRequest: (id: number) => Promise<void>
}

export const TableProducts = ({ products, deleteProductRequest }: Props) => {
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
            <TableHead className="text-white">Editar</TableHead>
            <TableHead className="text-white">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id} className="border-y cursor-pointer">
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                R$ {parseFloat(product.price.toString()).toFixed(2)}
              </TableCell>
              <TableCell>
                R$ {parseFloat(product.priceSpend.toString()).toFixed(2)}
              </TableCell>
              <TableCell>{product.codeBar}</TableCell>
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
