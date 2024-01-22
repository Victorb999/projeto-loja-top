"use client";
interface Props {
  id: string;
}
export const DeleteCustomer = ({ id }: Props) => {
  const deleteCustomerRequest = async (id: string) => {
    try {
      await fetch(`/api/customer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
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
