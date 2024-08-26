import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: string
  priceSpend: string
  codeBar: string
  description: string
  active: boolean
}

export const useProduct = (products: Product[]) => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const { toast } = useToast()
  const filterProductsByName = (name: string) => {
    if (name.length >= 3) {
      const productsFilteredByName = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      )
      setFilteredProducts(productsFilteredByName)
    } else if (name.length === 0) {
      // Reset to the original list if the search term is empty
      setFilteredProducts(products)
    }
  }

  const handleDelete = (id: number) => {
    const productsWithoutDeleted = filteredProducts.filter(
      (product) => product.id !== id
    )
    setFilteredProducts(productsWithoutDeleted)
  }

  const deleteProductRequest = async (id: number) => {
    try {
      await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      handleDelete(id)
      toast({
        title: "Produto Deletado",
        description: "Deletamos esse produto com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Ops, algo deu errado",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  return {
    filteredProducts,
    setFilteredProducts,
    filterProductsByName,
    deleteProductRequest,
    handleDelete,
  }
}
