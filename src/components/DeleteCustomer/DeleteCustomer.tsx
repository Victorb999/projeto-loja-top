"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

interface Props {
  id: number;
  removeCustomer: (id: number) => void;
}
export const DeleteCustomer = ({ id, removeCustomer }: Props) => {
  const deleteCustomerRequest = async (id: number) => {
    try {
      await fetch(`/api/customer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //const data = await response.json();

      //TODO ADICIONAR DIALOG de CONFIRMAÇAO
      removeCustomer(id);
      alert("Customer deleted successfully");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Button variant="destructive" onClick={() => deleteCustomerRequest(id)}>
      <TrashIcon />
    </Button>
  );
};
