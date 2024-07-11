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

interface PageProps {
  params: { id: string }
}

const productSchema = z.object({
  name: z.string().min(1, { message: "Nome obrigatório" }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Preço inválido" }),
  priceSpend: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Preço de custo inválido" }),
  codeBar: z.string(),
  description: z.string(),
})

type Product = z.infer<typeof productSchema>

export default function ProductsPage({ params }: PageProps) {
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      priceSpend: "",
      codeBar: "",
      description: "",
    },
  })

  const [loading, setLoading] = useState(true)

  const getProduct = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/product/${params.id}`)
      const product = await response.json()
      console.log("product", product)
      form.reset(product)
    } catch (error) {
      console.error("Erro ao carregar produto", error)
    } finally {
      setLoading(false)
    }
  }, [form, params.id])

  useEffect(() => {
    if (params.id !== "new") {
      getProduct()
    } else {
      setLoading(false)
    }
  }, [getProduct, params.id])

  const handleSubmitForm = async (data: Product) => {
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Redirecionar para a lista de produtos após o cadastro
      window.location.href = "/products"
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error)
      // Lógica para lidar com o erro (exibir mensagem ao usuário, por exemplo)
    }
  }

  const handleEditProduct = async (data: Product) => {
    try {
      const response = await fetch(`/api/product/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const product = await response.json()
      alert("Editado")
      form.reset(product)
    } catch (error) {
      console.error("Erro ao editar produto", error)
    }
  }

  const fields: { name: keyof Product; label: string }[] = [
    { name: "name", label: "Nome" },
    { name: "price", label: "Preço" },
    { name: "priceSpend", label: "Preço de custo" },
    { name: "codeBar", label: "Código de barras" },
    { name: "description", label: "Descrição" },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        {params.id === "new" ? "Novo produto" : "Editar produto"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={
            params.id === "new"
              ? form.handleSubmit(handleSubmitForm)
              : form.handleSubmit(handleEditProduct)
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
              {params.id === "new" ? "Cadastrar produto" : "Editar produto"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => (location.href = "/products")}
            >
              Voltar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
