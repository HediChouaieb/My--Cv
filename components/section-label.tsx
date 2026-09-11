import { cn } from "@/lib/utils"

interface SectionLabelProps {
  index: string
  label: string
  className?: string
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("mb-4 flex items-center gap-3", className)}>
      <span className="font-mono text-xs font-medium text-muted-foreground/50">{index}</span>
      <span className="h-px w-10 bg-border" />
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  )
}