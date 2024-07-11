import { PersonIcon, SketchLogoIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-between 
    h-screen w-screen p-24
    "
    >
      <h1 className="text-3xl text-purple-500 mb-8">Projeto Loja Top</h1>
      <h1 className="text-4xl font-bold mb-8">Bem-vindo à Página Inicial</h1>
      <div className="flex gap-2">
        <Button variant="default">
          <a href="/customers" className="flex gap-2 items-center">
            <PersonIcon /> Clientes
          </a>
        </Button>
        <Button variant="default">
          <a href="/products" className="flex gap-2 items-center">
            <SketchLogoIcon /> Produtos
          </a>
        </Button>
      </div>
    </div>
  )
}
