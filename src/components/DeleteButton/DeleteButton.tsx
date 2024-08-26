import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DeleteButtonProps {
  id: number
  deleteRequest: (id: number) => Promise<void> | void
  disabled?: boolean
}
export const DeleteButton = ({
  id,
  deleteRequest,
  disabled = false,
}: DeleteButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger className="py-2" asChild>
        <Button variant="destructive" disabled={disabled}>
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente deletar esse registro?</DialogTitle>
          <DialogDescription className="mt-4 flex justify-end">
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => deleteRequest(id)}>
                Deletar
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
