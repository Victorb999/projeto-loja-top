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
  sales: SaleListInterface
  deleteSaleRequest: (id: number) => Promise<void> | void
}

export const TableSales = ({ sales, deleteSaleRequest }: Props) => {
  return (
    <div>
      <Table className="min-w-full rounded overflow-hidden">
        <TableHeader>
          <TableRow className="bg-purple-500">
            <TableHead className="text-white">Código</TableHead>
            <TableHead className="text-white">Número de itens</TableHead>
            <TableHead className="text-white">Método de pagamento</TableHead>
            <TableHead className="text-white">Preço total</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Criada</TableHead>
            <TableHead className="text-white">Cliente</TableHead>
            <TableHead className="text-white">Continuar</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.sales.map((sale) => (
            <TableRow
              key={sale.id}
              className="text-gray-200 border-y cursor-pointer"
            >
              <TableCell>{sale.id}</TableCell>
              <TableCell>
                {sale.numberItems && sale.numberItems !== 0
                  ? sale.numberItems
                  : "-"}
              </TableCell>
              <TableCell>{sale.paymentMethod ?? "-"}</TableCell>
              <TableCell>
                {sale.totalPrice && sale.totalPrice !== "0"
                  ? `R$ ${parseFloat(sale.totalPrice.toString()).toFixed(2)}`
                  : "-"}
              </TableCell>
              <TableCell>
                {sale.finalDate ? (
                  `Fechada em ${sale.finalDate.toDateString()}`
                ) : (
                  <label className="text-green-500 font-bold">Aberta</label>
                )}
              </TableCell>
              <TableCell>{sale.createdAt.toDateString()}</TableCell>
              <TableCell>
                {sale.Customer ? sale.Customer.name : "Nenhum"}
              </TableCell>
              <TableCell>
                {sale.finalDate ? (
                  "-"
                ) : (
                  <Button variant="secondary">
                    <a href={`/sale/${sale.id}`}>
                      <ArrowRightIcon />
                    </a>
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <DeleteButton
                  id={sale.id}
                  deleteRequest={deleteSaleRequest}
                  disabled={sale.finalDate ? true : false}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
