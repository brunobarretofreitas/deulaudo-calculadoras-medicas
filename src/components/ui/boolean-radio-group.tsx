import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

interface BooleanRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  id: string;
}

const BooleanRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  BooleanRadioGroupProps
>(({ value, onValueChange, id, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className="flex gap-3"
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Item
        value="sim"
        id={`${id}-sim`}
        className={cn(
          "flex-1 cursor-pointer rounded-lg border-2 p-4 transition-all",
          "hover:bg-accent hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          value === "sim"
            ? "border-primary bg-primary/10 shadow-sm"
            : "border-input bg-background"
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <span
            className={cn(
              "font-medium text-sm",
              value === "sim" ? "text-primary" : "text-foreground"
            )}
          >
            Sim
          </span>
        </div>
      </RadioGroupPrimitive.Item>

      <RadioGroupPrimitive.Item
        value="nao"
        id={`${id}-nao`}
        className={cn(
          "flex-1 cursor-pointer rounded-lg border-2 p-4 transition-all",
          "hover:bg-accent hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          value === "nao"
            ? "border-primary bg-primary/10 shadow-sm"
            : "border-input bg-background"
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <span
            className={cn(
              "font-medium text-sm",
              value === "nao" ? "text-primary" : "text-foreground"
            )}
          >
            Não
          </span>
        </div>
      </RadioGroupPrimitive.Item>
    </RadioGroupPrimitive.Root>
  );
});

BooleanRadioGroup.displayName = "BooleanRadioGroup";

export { BooleanRadioGroup };
