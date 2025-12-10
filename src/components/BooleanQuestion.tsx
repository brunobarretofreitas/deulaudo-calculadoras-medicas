import { Label } from "@/components/ui/label";
import { BooleanRadioGroup } from "@/components/ui/boolean-radio-group";

interface BooleanQuestionProps {
  pergunta: string;
  value: string;
  onValueChange: (value: string) => void;
  id: string;
  showBorder?: boolean;
}

export function BooleanQuestion({
  pergunta,
  value,
  onValueChange,
  id,
  showBorder = false,
}: BooleanQuestionProps) {
  return (
    <div className={`flex flex-col gap-4 ${showBorder ? "pt-4 border-t" : ""}`}>
      <Label className="text-base font-semibold">{pergunta}</Label>
      <BooleanRadioGroup
        value={value}
        onValueChange={onValueChange}
        id={id}
      />
    </div>
  );
}
