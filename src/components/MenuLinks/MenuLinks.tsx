import {
  PersonIcon,
  SketchLogoIcon,
  ReaderIcon,
  BackpackIcon,
  HomeIcon,
} from "@radix-ui/react-icons"
import { Button } from "../ui/button"

export const MenuLinks = () => {
  return (
    <div className="flex gap-2 w-full justify-center p-4">
      <Button variant="ghost">
        <a href="/" className="flex gap-2 items-center">
          <HomeIcon /> Home
        </a>
      </Button>
      <Button variant="ghost">
        <a href="/customers" className="flex gap-2 items-center">
          <PersonIcon /> Clientes
        </a>
      </Button>
      <Button variant="ghost">
        <a href="/products" className="flex gap-2 items-center">
          <SketchLogoIcon /> Produtos
        </a>
      </Button>
      <Button variant="ghost">
        <a href="/sales" className="flex gap-2 items-center">
          <ReaderIcon /> Vendas
        </a>
      </Button>
      <Button variant="ghost">
        <a href="/sale/new" className="flex gap-2 items-center">
          <BackpackIcon /> Nova venda
        </a>
      </Button>
    </div>
  )
}
