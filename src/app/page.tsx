import Image from "next/image"

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-between 
    p-24
    "
    >
      <h1 className="text-3xl text-purple-500 mb-8">
        <Image src="/logo.svg" alt="logo" width={300} height={100} />
      </h1>
      <h1 className="text-4xl font-bold mb-8">Bem-vindo à Página Inicial</h1>
    </div>
  )
}
