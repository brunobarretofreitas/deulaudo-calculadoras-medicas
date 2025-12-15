"use client";

import { useState, useEffect, useMemo } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/orads-usg/ResultCard";
import { cn } from "@/lib/utils";

interface ExtraOvarianLesionFlowProps {
  value?: string;
  onValueChange?: (value: string) => void;
  idPrefix?: string;
}

export function ExtraOvarianLesionFlow({ 
  value: externalValue, 
  onValueChange, 
  idPrefix = "lesao-extra-ovariana"
}: ExtraOvarianLesionFlowProps) {
  const [internalValue, setInternalValue] = useState<string>(externalValue || "");

  // Sincronizar com valor externo se fornecido
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const currentValue = externalValue !== undefined ? externalValue : internalValue;

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  // Calcular o score baseado na seleção
  const score = useMemo(() => {
    // Se qualquer opção de lesão extra-ovariana for selecionada, score é 2
    if (currentValue !== "") {
      return 2;
    }
    return null;
  }, [currentValue]);

  return (
    <div className="flex flex-col gap-4">
      <Label className="text-base font-semibold">Lesão Extra-Ovariana</Label>
      <RadioGroupPrimitive.Root
        value={currentValue}
        onValueChange={handleValueChange}
        className="flex flex-col gap-3"
      >
        <RadioGroupPrimitive.Item
          value="typical-paraovarian-cyst"
          id={`${idPrefix}-paraovarian`}
          className={cn(
            "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
            "hover:bg-accent hover:border-primary/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            currentValue === "typical-paraovarian-cyst"
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-input bg-background"
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                currentValue === "typical-paraovarian-cyst"
                  ? "border-primary bg-primary"
                  : "border-muted-foreground bg-background"
              )}
            >
              {currentValue === "typical-paraovarian-cyst" && (
                <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <span
                className={cn(
                  "font-medium text-sm leading-relaxed block mb-2",
                  currentValue === "typical-paraovarian-cyst" ? "text-primary" : "text-foreground"
                )}
              >
                Cisto Paraovariano Típico
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cisto unilocular, sem vascularização interna*, e pelo menos um dos seguintes:
              </p>
              <ul className="mt-2 ml-4 space-y-1 text-xs text-muted-foreground list-disc">
                <li>Localização adjacente ao ovário, mas separada dele</li>
                <li>Paredes finas e lisas</li>
                <li>Conteúdo líquido simples</li>
              </ul>
            </div>
          </div>
        </RadioGroupPrimitive.Item>

        <RadioGroupPrimitive.Item
          value="typical-peritoneal-inclusion-cyst"
          id={`${idPrefix}-peritoneal`}
          className={cn(
            "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
            "hover:bg-accent hover:border-primary/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            currentValue === "typical-peritoneal-inclusion-cyst"
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-input bg-background"
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                currentValue === "typical-peritoneal-inclusion-cyst"
                  ? "border-primary bg-primary"
                  : "border-muted-foreground bg-background"
              )}
            >
              {currentValue === "typical-peritoneal-inclusion-cyst" && (
                <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <span
                className={cn(
                  "font-medium text-sm leading-relaxed block mb-2",
                  currentValue === "typical-peritoneal-inclusion-cyst" ? "text-primary" : "text-foreground"
                )}
              >
                Cisto de Inclusão Peritoneal Típico
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cisto unilocular ou multilocular, sem vascularização interna*, e pelo menos um dos seguintes:
              </p>
              <ul className="mt-2 ml-4 space-y-1 text-xs text-muted-foreground list-disc">
                <li>Múltiplas septações finas e lisas</li>
                <li>Envolvimento de estruturas adjacentes (ovário, útero)</li>
                <li>Conteúdo líquido simples</li>
              </ul>
            </div>
          </div>
        </RadioGroupPrimitive.Item>

        <RadioGroupPrimitive.Item
          value="typical-hydrosalpinx"
          id={`${idPrefix}-hydrosalpinx`}
          className={cn(
            "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
            "hover:bg-accent hover:border-primary/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            currentValue === "typical-hydrosalpinx"
              ? "border-primary bg-primary/10 shadow-sm"
              : "border-input bg-background"
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                currentValue === "typical-hydrosalpinx"
                  ? "border-primary bg-primary"
                  : "border-muted-foreground bg-background"
              )}
            >
              {currentValue === "typical-hydrosalpinx" && (
                <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <span
                className={cn(
                  "font-medium text-sm leading-relaxed block mb-2",
                  currentValue === "typical-hydrosalpinx" ? "text-primary" : "text-foreground"
                )}
              >
                Hidrossalpinge Típica
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Estrutura tubular alongada, sem vascularização interna*, e pelo menos um dos seguintes:
              </p>
              <ul className="mt-2 ml-4 space-y-1 text-xs text-muted-foreground list-disc">
                <li>Dobras incompletas da parede (sinal de "contas" ou "roda dentada")</li>
                <li>Conteúdo líquido simples</li>
                <li>Localização adjacente ao ovário</li>
              </ul>
            </div>
          </div>
        </RadioGroupPrimitive.Item>
      </RadioGroupPrimitive.Root>
      
      {/* Exibir ResultCard quando uma opção for selecionada */}
      {score !== null && (
        <ResultCard score={score} />
      )}
    </div>
  );
}

