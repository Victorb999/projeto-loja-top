"use client"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingSkeleton } from "@/components/LoadingSkeleton/LoadingSkeleton"
import { useToast } from "@/components/ui/use-toast"

interface PageProps {
  params: { id: string }
}

const costumerSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  rgie: z.string(),
  birthDate: z.coerce.date(),
  cpfcnpj: z.string(),
  phone: z.string().max(11, { message: "Telefone inválido" }),
  email: z.string(),
  cep: z.string(),
  address: z.string(),
  number: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string().max(2, { message: "Sigla inválida" }),
})

type Customer = z.infer<typeof costumerSchema>

export default function CustomersPage({ params }: PageProps) {
  const form = useForm<Customer>({
    resolver: zodResolver(costumerSchema),
    defaultValues: {
      name: "",
      rgie: "",
      birthDate: new Date(),
      cpfcnpj: "",
      phone: "",
      email: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  })
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  const getCustomer = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/customer/${params.id}`)
      const customer = await response.json()
      form.reset(customer)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar o cliente",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [form, params.id, toast])

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
      toast({
        title: "Erro",
        description: "Erro ao cadastrar o cliente",
        variant: "destructive",
      })
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
      toast({
        title: "Sucesso",
        description: "Cliente editado com sucesso",
      })
      form.reset(customer)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao editar o cliente",
        variant: "destructive",
      })
    }
  }

  const fields: { name: keyof Customer; label: string }[] = [
    { name: "name", label: "Nome" },
    { name: "rgie", label: "RG" },
    { name: "cpfcnpj", label: "CPF" },
    { name: "birthDate", label: "Data de Nascimento" },
    { name: "phone", label: "Telefone" },
    { name: "email", label: "Email" },
    { name: "cep", label: "CEP" },
    { name: "address", label: "Endereço" },
    { name: "number", label: "Número" },
    { name: "complement", label: "Complemento" },
    { name: "neighborhood", label: "Bairro" },
    { name: "city", label: "Cidade" },
    { name: "state", label: "Estado" },
  ]

  if (loading) {
    return <LoadingSkeleton />
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
                      <Input
                        placeholder={label}
                        {...field}
                        type={name === "birthDate" ? "date" : "text"}
                        value={
                          typeof field.value === "object"
                            ? field.value.toISOString()
                            : field.value
                        }
                      />
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
