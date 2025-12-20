import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface ScoredOption {
  value: string;
  label: string;
  points: number;
  description?: string;
  key?: string;
}

interface ScoredMultipleSelectQuestionProps {
  pergunta: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  id: string;
  opcoes: ScoredOption[];
  showBorder?: boolean;
  definitions?: Array<{ term: string; description: string }>;
}

export function ScoredMultipleSelectQuestion({
  pergunta,
  value,
  onValueChange,
  id,
  opcoes,
  showBorder = false,
  definitions = [],
}: ScoredMultipleSelectQuestionProps) {
  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange(value.filter((v) => v !== optionValue));
    } else {
      onValueChange([...value, optionValue]);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${showBorder ? "pt-4 border-t" : ""}`}>
      <Label className="text-base font-semibold">{pergunta}</Label>
      
      {/* Exibir definições se houver */}
      {definitions.length > 0 && (
        <div className="space-y-2 mb-2">
          {definitions.map((def, index) => (
            <div
              key={index}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
            >
              <p className="text-sm">
                <strong>{def.term}:</strong> {def.description}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {opcoes.map((opcao) => {
          const optionKey = opcao.key || opcao.value;
          const isSelected = value.includes(opcao.value);
          
          return (
            <div
              key={optionKey}
              className={cn(
                "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
                "hover:bg-accent hover:border-primary/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-input bg-background"
              )}
              onClick={() => handleToggle(opcao.value)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <CheckboxPrimitive.Root
                    checked={isSelected}
                    onCheckedChange={() => handleToggle(opcao.value)}
                    className={cn(
                      "h-4 w-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground bg-background"
                    )}
                    id={`${id}-${optionKey}`}
                  >
                    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                  <div className="flex-1">
                    <span
                      className={cn(
                        "font-normal text-sm leading-relaxed",
                        isSelected ? "text-primary" : "text-foreground"
                      )}
                    >
                      {opcao.label}
                    </span>
                    {opcao.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {opcao.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={cn(
                      "text-sm font-medium px-2 py-1 rounded",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {opcao.points} {opcao.points === 1 ? "ponto" : "pontos"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




