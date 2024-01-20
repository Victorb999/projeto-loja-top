export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-between 
    h-screen w-screen p-24
    "
    >
      alou mundão
      <h1 className="text-4xl font-bold mb-8">Bem-vindo à Página Inicial</h1>
      <a href="/customers" className="text-blue-500 underline">
        Ver Lista de Clientes
      </a>
    </div>
  );
}
