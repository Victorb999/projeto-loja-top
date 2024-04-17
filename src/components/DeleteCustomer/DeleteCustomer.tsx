"use client";

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
      removeCustomer(id);
      alert("Customer deleted successfully");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <button
      className="bg-red-500 hover:bg-red-700 
  text-white font-bold py-2 px-4 rounded"
      onClick={() => deleteCustomerRequest(id)}
    >
      Delete
    </button>
  );
};
