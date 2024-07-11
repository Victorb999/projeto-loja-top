import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteButtonProps {
  id: number;
  deleteRequest: (id: number) => Promise<void>;
}
export const DeleteButton = ({ id, deleteRequest }: DeleteButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger className=" py-2 ">
        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente deletar esse registro?</DialogTitle>
          <DialogDescription className="mt-4 flex justify-end">
            <Button variant="destructive" onClick={() => deleteRequest(id)}>
              Deletar
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
