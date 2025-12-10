import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MultipleChoiceQuestionProps {
  pergunta: string;
  value: string;
  onValueChange: (value: string) => void;
  id: string;
  opcoes: { value: string; label: string; key?: string }[];
  showBorder?: boolean;
}

export function MultipleChoiceQuestion({
  pergunta,
  value,
  onValueChange,
  id,
  opcoes,
  showBorder = false,
}: MultipleChoiceQuestionProps) {
  return (
    <div className={`flex flex-col gap-4 ${showBorder ? "pt-4 border-t" : ""}`}>
      <Label className="text-base font-semibold">{pergunta}</Label>
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        className="flex flex-col gap-3"
      >
        {opcoes.map((opcao) => {
          const optionKey = opcao.key || opcao.value;
          const isSelected = value === opcao.value;
          
          return (
            <RadioGroupPrimitive.Item
              key={optionKey}
              value={opcao.value}
              id={`${id}-${optionKey}`}
              className={cn(
                "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
                "hover:bg-accent hover:border-primary/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-input bg-background"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground bg-background"
                  )}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    "font-normal text-sm leading-relaxed",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {opcao.label}
                </span>
              </div>
            </RadioGroupPrimitive.Item>
          );
        })}
      </RadioGroupPrimitive.Root>
    </div>
  );
}
