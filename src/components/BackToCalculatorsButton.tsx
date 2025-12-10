import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackToCalculatorsButtonProps {
  className?: string;
}

export function BackToCalculatorsButton({ className = "" }: BackToCalculatorsButtonProps) {
  return (
    <Link href="/" className="inline-block">
      <Button
        variant="ghost"
        className={`cursor-pointer -ml-2 group hover:bg-accent/50 transition-all duration-200 rounded-lg px-3 py-2 ${className}`}
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Voltar para calculadoras
        </span>
      </Button>
    </Link>
  );
}
