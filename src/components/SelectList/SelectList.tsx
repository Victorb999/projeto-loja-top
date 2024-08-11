import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectListProps {
  items: { id: string; name: string }[]
  placeholder: string
  onSelect: (id: string) => void
}

export const SelectList = ({
  items,
  placeholder,
  onSelect,
}: SelectListProps) => {
  return (
    <Select onValueChange={(e: any) => onSelect(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
