"use client"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"

interface PageProps {
  params: { id: string }
}

const costumerSchema = z.object({
  Nome: z.string().min(1, { message: "Nome obrigatório" }),
  RGIE: z.string().min(1, { message: "RG obrigatório" }),
  DataNascimento: z.string().datetime(),
  CPFCNPJ: z.string(),
  Telefone1: z.string(),
  Email: z.string(),
  CEP: z.string(),
  Endereco: z.string(),
  Numero: z.string(),
  Complemento: z.string(),
  Bairro: z.string(),
  Cidade: z.string(),
  UF: z.string(),
})

type Customer = z.infer<typeof costumerSchema>

export default function CustomersPage({ params }: PageProps) {
  const form = useForm<Customer>({
    resolver: zodResolver(costumerSchema),
    defaultValues: {
      Nome: "",
      RGIE: "",
      DataNascimento: `1990-01-01T00:00:00.000`,
      CPFCNPJ: "",
      Telefone1: "",
      Email: "",
      CEP: "",
      Endereco: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      UF: "",
    },
  })

  const [loading, setLoading] = useState(true)

  const getCustomer = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/customer/${params.id}`)
      const customer = await response.json()
      console.log("customer", customer)
      form.reset(customer)
    } catch (error) {
      console.error("Erro doidao", error)
    } finally {
      setLoading(false)
    }
  }, [form, params.id])

  useEffect(() => {
    if (params.id !== "new") {
      getCustomer()
    } else {
      setLoading(false)
    }
  }, [getCustomer, params.id])

  const handleSubmitForm = async (data: Customer) => {
    try {
      await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Redirecionar para a lista de clientes após o cadastro
      window.location.href = "/customers"
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error)
      // Lógica para lidar com o erro (exibir mensagem ao usuário, por exemplo)
    }
  }

  const handleEditClient = async (data: Customer) => {
    try {
      const response = await fetch(`/api/customer/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const customer = await response.json()
      alert("Editado")
      form.reset(customer)
    } catch (error) {
      console.error("Erro doidao", error)
    }
  }

  const fields: { name: keyof Customer; label: string }[] = [
    { name: "Nome", label: "Nome" },
    { name: "RGIE", label: "RG" },
    { name: "CPFCNPJ", label: "CPF" },
    { name: "DataNascimento", label: "Data de Nascimento" },
    { name: "Telefone1", label: "Telefone1" },
    { name: "Email", label: "Email" },
    { name: "CEP", label: "CEP" },
    { name: "Endereco", label: "Endereço" },
    { name: "Numero", label: "Número" },
    { name: "Complemento", label: "Complemento" },
    { name: "Bairro", label: "Bairro" },
    { name: "Cidade", label: "Cidade" },
    { name: "UF", label: "Estado" },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        {params.id === "new" ? "Novo cliente" : "Editar cliente"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={
            params.id === "new"
              ? form.handleSubmit(handleSubmitForm)
              : form.handleSubmit(handleEditClient)
          }
          className="max-w-md mx-auto flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            {fields.map(({ name, label }) => (
              <FormField
                control={form.control}
                key={name}
                name={name}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={label} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" variant="default">
              {params.id === "new" ? "Cadastrar cliente" : "Editar cliente"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => (location.href = "/customers")}
            >
              Voltar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
