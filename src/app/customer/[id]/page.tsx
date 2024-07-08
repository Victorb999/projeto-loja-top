"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
interface PageProps {
  params: { id: string };
}

const costumerSchema = z.object({
  Nome: z.string().min(1, { message: "Nome obrigatório" }),
  RGIE: z.string().min(1, { message: "RG obrigatório" }),
  DataNascimento: z.coerce.date(),
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
  Limite: z.coerce.number(),
  Saldo: z.coerce.number(),
});

type Customer = z.infer<typeof costumerSchema>;

export default function CustomersPage({ params }: PageProps) {
  const form = useForm<Customer>({
    resolver: zodResolver(costumerSchema),
  });

  const getCustomer = async () => {
    try {
      const response = await fetch(`/api/customers/${params.id}`);
      const customer = await response.json();
      console.log("customer", customer);
      form.reset(customer);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
    }
  };

  if (params.slug !== "new") {
    getCustomer();
    console.log("params.slug", params.slug);
  }

  const handleSubmitForm = async (data: Customer) => {
    console.log("data", data);
    try {
      await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Redirecionar para a lista de clientes após o cadastro
      window.location.href = "/customers";
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      // Lógica para lidar com o erro (exibir mensagem ao usuário, por exemplo)
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Novo Cliente</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="max-w-md mx-auto flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="Nome"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="RGIE"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>RG</FormLabel>
                  <FormControl>
                    <Input placeholder="RG" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CPFCNPJ"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="DataNascimento"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Data de Nascimento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Telefone1"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Telefone1</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="CEP"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="CEP" maxLength={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Endereco"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Numero"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Complemento"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Bairro"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Cidade"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="UF"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" variant="default">
              Cadastrar Cliente
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
  );
}
