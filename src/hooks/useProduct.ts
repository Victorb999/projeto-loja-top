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
      alert("Product deleted successfully")
    } catch (error) {
      alert(error)
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
