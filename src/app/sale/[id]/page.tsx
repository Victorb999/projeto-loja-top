interface PageProps {
  params: { id: string }
}

export default function SalePage({ params }: PageProps) {
  /*
  TODO: 
  Rota para buscar os clientes
  Rota para buscar os Produtos
  Rota para adicionar os produtos
  Rota para adicionar o cliente

  Rota para buscar a venda

  Rota para finalizar a venda
  
  */

  return (
    <div className="flex gap-4 p-8 items-center justify-center">
      <div>Selecione o cliente</div>
      <div>Selecione o produto</div>
      <div>Lista de produtos</div>
      <div>Finalizar venda</div>
    </div>
  )
}
