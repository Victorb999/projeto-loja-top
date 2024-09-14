import { SaleListInterface } from "@/types/types"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table"

import { DeleteButton } from "../DeleteButton/DeleteButton"
import { Button } from "../ui/button"

import { ArrowRightIcon } from "@radix-ui/react-icons"

interface Props {
  sales: SaleListInterface[]
}

export const TableReport = ({ sales }: Props) => {
  return (
    <div>
      <Table className="w-fit rounded overflow-hidden">
        <TableHeader>
          <TableRow className="bg-purple-500">
            <TableHead className="text-white">Código</TableHead>
            <TableHead className="text-white">Método de pagamento</TableHead>
            <TableHead className="text-white">Preço total</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Criada</TableHead>
            <TableHead className="text-white">Cliente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id} className="border-y cursor-pointer">
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.paymentMethod ?? "-"}</TableCell>
              <TableCell>
                {sale.totalPrice && sale.totalPrice !== "0"
                  ? `R$ ${parseFloat(sale.totalPrice.toString()).toFixed(2)}`
                  : "-"}
              </TableCell>
              <TableCell>
                {sale.finalDate ? (
                  `Fechada em ${sale.finalDate.toString()}`
                ) : (
                  <label className="text-green-500 font-bold">Aberta</label>
                )}
              </TableCell>
              <TableCell>{sale.createdAt.toString()}</TableCell>
              <TableCell>
                {sale.Customer ? sale.Customer.name : "Nenhum"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
