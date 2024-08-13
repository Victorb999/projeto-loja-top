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

interface Props {
  items: ItemProduct[]
  removeItem: (id: number) => void
}

export const TableItems = ({ items, removeItem }: Props) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <>
      <Table className="min-w-full rounded overflow-hidden">
        <TableHeader>
          <TableRow className="bg-purple-500">
            <TableHead className="text-white">Nome</TableHead>
            <TableHead className="text-white">Preço un.</TableHead>
            <TableHead className="text-white">Quant</TableHead>
            <TableHead className="text-white">Preço total</TableHead>
            <TableHead className="text-white">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: ItemProduct) => (
            <TableRow
              key={item.id}
              className="text-gray-200 border-y cursor-pointer"
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>
                R$ {parseFloat(item.price.toString()).toFixed(2)}
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{`R$ ${(
                parseFloat(item?.price.toString()) * item.quantity
              ).toFixed(2)}`}</TableCell>
              <TableCell>
                <DeleteButton
                  id={item.id}
                  deleteRequest={() => removeItem(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded p-4 flex justify-end">
        <span className="text-xl text-white tracking-widest">
          Total: R$ {parseFloat(totalPrice.toString()).toFixed(2)}
        </span>
      </div>
    </>
  )
}
