import { Button } from "@/components/ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"

interface EditButtonProps {
  url: string
}

export const EditButton = ({ url }: EditButtonProps) => {
  return (
    <Button variant="secondary">
      <a href={url}>
        <Pencil1Icon />
      </a>
    </Button>
  )
}
