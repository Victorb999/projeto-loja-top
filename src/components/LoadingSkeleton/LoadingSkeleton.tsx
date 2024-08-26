import { Skeleton } from "@/components/ui/skeleton"

interface EditButtonProps {
  url: string
}

export const LoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[100px] pt-10 gap-2">
      <Skeleton className="w-[300px] h-[30px] rounded" />
      <Skeleton className="w-[300px] h-[30px] rounded" />
      <Skeleton className="w-[300px] h-[30px] rounded" />
      <Skeleton className="w-[300px] h-[30px] rounded" />
      <Skeleton className="w-[300px] h-[30px] rounded" />
    </div>
  )
}
