"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { MultipleChoiceQuestion } from "@/components/MultipleChoiceQuestion";
import { BooleanQuestion } from "@/components/BooleanQuestion";
import { ResultCard } from "@/components/orads-usg/ResultCard";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";


export function OvarianLesionFlow() {
  const [lesaoOvarianaTipoResposta, setLesaoOvarianaTipoResposta] = useState<string>("");
  const [tamanhoHemorrhagicCyst, setTamanhoHemorrhagicCyst] = useState<string>("");
  const [tamanhoDermoidCyst, setTamanhoDermoidCyst] = useState<string>("");
  const [tamanhoEndometrioma, setTamanhoEndometrioma] = useState<string>("");
  const [continuarGerenciamento, setContinuarGerenciamento] = useState<string>("");
  const [continuarGerenciamentoEndometrioma, setContinuarGerenciamentoEndometrioma] = useState<string>("");
  const [statusMenopausa, setStatusMenopausa] = useState<string>("");
  const [statusMenopausaEndometrioma, setStatusMenopausaEndometrioma] = useState<string>("");
  const [tamanhoFinal, setTamanhoFinal] = useState<string>("");

  // Determinar se deve mostrar a pergunta 2.1.1 (tamanho do cisto hemorrágico)
  const mostrarPerguntaTamanhoHemorrhagic = lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst";

  // Determinar se deve mostrar a pergunta de tamanho do cisto dermoide
  const mostrarPerguntaTamanhoDermoid = lesaoOvarianaTipoResposta === "typical-dermoid-cyst";

  // Determinar se deve mostrar a pergunta de tamanho do endometrioma
  const mostrarPerguntaTamanhoEndometrioma = lesaoOvarianaTipoResposta === "typical-endometrioma";

  // Determinar se deve mostrar a pergunta de continuar gerenciamento (após score 2 para cisto hemorrágico)
  const mostrarPerguntaContinuar = tamanhoHemorrhagicCyst === "menor-10cm";

  // Determinar se deve mostrar a pergunta de continuar gerenciamento (após score 2 para endometrioma)
  const mostrarPerguntaContinuarEndometrioma = tamanhoEndometrioma === "menor-10cm";

  // Determinar se deve mostrar a pergunta de status menopausa
  const mostrarPerguntaStatusMenopausa = continuarGerenciamento === "sim";

  // Determinar se deve mostrar a pergunta de status menopausa (endometrioma)
  const mostrarPerguntaStatusMenopausaEndometrioma = continuarGerenciamentoEndometrioma === "sim";

  // Determinar se deve mostrar a pergunta de tamanho final (para pré-menopausa)
  const mostrarPerguntaTamanhoFinal = statusMenopausa === "premenopausal";

  // Calcular o score baseado nas respostas
  const score = useMemo(() => {
    // Se a resposta for "Cisto Hemorrágico Típico" e tamanho for < 10cm, score é 2
    if (lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst" &&
        tamanhoHemorrhagicCyst === "menor-10cm") {
      return 2;
    }
    // Se a resposta for "Cisto Hemorrágico Típico" e tamanho for >= 10cm, score é 3
    if (lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst" &&
        tamanhoHemorrhagicCyst === "maior-igual-10cm") {
      return 3;
    }
    // Se a resposta for "Cisto Dermoide Típico" e tamanho for < 10cm, score é 2
    if (lesaoOvarianaTipoResposta === "typical-dermoid-cyst" &&
        tamanhoDermoidCyst === "menor-10cm") {
      return 2;
    }
    // Se a resposta for "Cisto Dermoide Típico" e tamanho for >= 10cm, score é 3
    if (lesaoOvarianaTipoResposta === "typical-dermoid-cyst" &&
        tamanhoDermoidCyst === "maior-igual-10cm") {
      return 3;
    }
    // Se a resposta for "Endometrioma Típico" e tamanho for < 10cm, score é 2
    if (lesaoOvarianaTipoResposta === "typical-endometrioma" &&
        tamanhoEndometrioma === "menor-10cm") {
      return 2;
    }
    // Se a resposta for "Endometrioma Típico" e tamanho for >= 10cm, score é 3
    if (lesaoOvarianaTipoResposta === "typical-endometrioma" &&
        tamanhoEndometrioma === "maior-igual-10cm") {
      return 3;
    }
    return null;
  }, [lesaoOvarianaTipoResposta, tamanhoHemorrhagicCyst, tamanhoDermoidCyst, tamanhoEndometrioma]);

  // Resetar quando o tipo de lesão ovariana mudar
  const handleLesaoOvarianaTipoChange = (value: string) => {
    setLesaoOvarianaTipoResposta(value);
    if (value !== "typical-hemorrhagic-cyst") {
      setTamanhoHemorrhagicCyst("");
      setContinuarGerenciamento("");
      setStatusMenopausa("");
      setTamanhoFinal("");
    }
    if (value !== "typical-dermoid-cyst") {
      setTamanhoDermoidCyst("");
    }
    if (value !== "typical-endometrioma") {
      setTamanhoEndometrioma("");
      setContinuarGerenciamentoEndometrioma("");
      setStatusMenopausaEndometrioma("");
    }
  };

  return (
    <>
      {/* Pergunta 2.1: Lesão Ovariana */}
      <div className="flex flex-col gap-4 pt-4 border-t">
        <Label className="text-base font-semibold">Lesão Ovariana</Label>
        <RadioGroupPrimitive.Root
          value={lesaoOvarianaTipoResposta}
          onValueChange={handleLesaoOvarianaTipoChange}
          className="flex flex-col gap-3"
        >
          <RadioGroupPrimitive.Item
            value="typical-hemorrhagic-cyst"
            id="lesao-ovariana-hemorrhagic"
            className={cn(
              "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
              "hover:bg-accent hover:border-primary/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-input bg-background"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                  lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst"
                    ? "border-primary bg-primary"
                    : "border-muted-foreground bg-background"
                )}
              >
                {lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst" && (
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <span
                  className={cn(
                    "font-medium text-sm leading-relaxed block mb-2",
                    lesaoOvarianaTipoResposta === "typical-hemorrhagic-cyst" ? "text-primary" : "text-foreground"
                  )}
                >
                  Cisto Hemorrágico Típico
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cisto unilocular, sem vascularização interna*, e pelo menos um dos seguintes:
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-xs text-muted-foreground list-disc">
                  <li>Padrão reticular (linhas finas e delgadas que se cruzam representando filamentos de fibrina)</li>
                  <li>Coágulo retrátil (componente intracístico com margens retas, côncavas ou angulares)</li>
                </ul>
              </div>
            </div>
          </RadioGroupPrimitive.Item>

          <RadioGroupPrimitive.Item
            value="typical-dermoid-cyst"
            id="lesao-ovariana-dermoid"
            className={cn(
              "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
              "hover:bg-accent hover:border-primary/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              lesaoOvarianaTipoResposta === "typical-dermoid-cyst"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-input bg-background"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                  lesaoOvarianaTipoResposta === "typical-dermoid-cyst"
                    ? "border-primary bg-primary"
                    : "border-muted-foreground bg-background"
                )}
              >
                {lesaoOvarianaTipoResposta === "typical-dermoid-cyst" && (
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <span
                  className={cn(
                    "font-medium text-sm leading-relaxed block mb-2",
                    lesaoOvarianaTipoResposta === "typical-dermoid-cyst" ? "text-primary" : "text-foreground"
                  )}
                >
                  Cisto Dermoide Típico
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Lesão cística com ≤3 loculi, sem vascularização interna*, e pelo menos um dos seguintes:
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-xs text-muted-foreground list-disc">
                  <li>Componente(s) hiperecogênico(s) (difuso ou regional) com sombra acústica</li>
                  <li>Estruturas esféricas ecogênicas flutuantes</li>
                  <li>Linhas e pontos hiperecogênicos</li>
                </ul>
              </div>
            </div>
          </RadioGroupPrimitive.Item>

          <RadioGroupPrimitive.Item
            value="typical-endometrioma"
            id="lesao-ovariana-endometrioma"
            className={cn(
              "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
              "hover:bg-accent hover:border-primary/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              lesaoOvarianaTipoResposta === "typical-endometrioma"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-input bg-background"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                  lesaoOvarianaTipoResposta === "typical-endometrioma"
                    ? "border-primary bg-primary"
                    : "border-muted-foreground bg-background"
                )}
              >
                {lesaoOvarianaTipoResposta === "typical-endometrioma" && (
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <span
                  className={cn(
                    "font-medium text-sm leading-relaxed block mb-2",
                    lesaoOvarianaTipoResposta === "typical-endometrioma" ? "text-primary" : "text-foreground"
                  )}
                >
                  Endometrioma Típico
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Lesão cística com ≤3 loculi, sem vascularização interna*, ecos homogêneos de baixo nível/vidro fosco, e paredes internas/septações lisas
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  - +/- Focos ecogênicos puntiformes periféricos na parede
                </p>
              </div>
            </div>
          </RadioGroupPrimitive.Item>
        </RadioGroupPrimitive.Root>
      </div>

      {/* Pergunta 2.1.1: Tamanho do Cisto Hemorrágico */}
      {mostrarPerguntaTamanhoHemorrhagic && (
        <MultipleChoiceQuestion
          pergunta="Qual é o tamanho?"
          value={tamanhoHemorrhagicCyst}
          onValueChange={setTamanhoHemorrhagicCyst}
          id="tamanho-hemorrhagic-cyst"
          opcoes={[
            { value: "menor-10cm", label: "< 10cm" },
            { value: "maior-igual-10cm", label: ">= 10cm" },
          ]}
          showBorder
        />
      )}

      {/* Pergunta de tamanho do Cisto Dermoide */}
      {mostrarPerguntaTamanhoDermoid && (
        <MultipleChoiceQuestion
          pergunta="Qual é o tamanho?"
          value={tamanhoDermoidCyst}
          onValueChange={setTamanhoDermoidCyst}
          id="tamanho-dermoid-cyst"
          opcoes={[
            { value: "menor-10cm", label: "< 10cm" },
            { value: "maior-igual-10cm", label: ">= 10cm" },
          ]}
          showBorder
        />
      )}

      {/* Pergunta de tamanho do Endometrioma */}
      {mostrarPerguntaTamanhoEndometrioma && (
        <MultipleChoiceQuestion
          pergunta="Qual é o tamanho?"
          value={tamanhoEndometrioma}
          onValueChange={setTamanhoEndometrioma}
          id="tamanho-endometrioma"
          opcoes={[
            { value: "menor-10cm", label: "< 10cm" },
            { value: "maior-igual-10cm", label: ">= 10cm" },
          ]}
          showBorder
        />
      )}

      {/* Pergunta de continuar gerenciamento - aparece após score 2 para cisto hemorrágico < 10cm */}
      {mostrarPerguntaContinuar && (
        <Card>
          <CardContent className="pt-6">
            <BooleanQuestion
              pergunta="Gerenciamento Adicional (Imagem) Recomendado! Continuar?"
              value={continuarGerenciamento}
              onValueChange={setContinuarGerenciamento}
              id="continuar-gerenciamento"
            />
          </CardContent>
        </Card>
      )}

      {/* Pergunta de continuar gerenciamento - aparece após score 2 para endometrioma < 10cm */}
      {mostrarPerguntaContinuarEndometrioma && (
        <Card>
          <CardContent className="pt-6">
            <BooleanQuestion
              pergunta="Gerenciamento Adicional (Imagem) Recomendado! Continuar?"
              value={continuarGerenciamentoEndometrioma}
              onValueChange={setContinuarGerenciamentoEndometrioma}
              id="continuar-gerenciamento-endometrioma"
            />
          </CardContent>
        </Card>
      )}

      {/* Pergunta de status menopausa */}
      {mostrarPerguntaStatusMenopausa && (
        <Card>
          <CardContent className="pt-6">
            <MultipleChoiceQuestion
              pergunta="Status Menopáusico?"
              value={statusMenopausa}
              onValueChange={setStatusMenopausa}
              id="status-menopausa"
              opcoes={[
                { value: "premenopausal", label: "Pré-menopausa" },
                { value: "early-postmenopausal", label: "Pós-menopausa precoce (<5 anos)" },
                { value: "late-postmenopausal", label: "Pós-menopausa tardia (≥5 anos)" },
              ]}
            />
          </CardContent>
        </Card>
      )}

      {/* Pergunta de status menopausa (endometrioma) */}
      {mostrarPerguntaStatusMenopausaEndometrioma && (
        <Card>
          <CardContent className="pt-6">
            <MultipleChoiceQuestion
              pergunta="Status Menopáusico?"
              value={statusMenopausaEndometrioma}
              onValueChange={setStatusMenopausaEndometrioma}
              id="status-menopausa-endometrioma"
              opcoes={[
                { value: "premenopausal", label: "Pré-menopausa" },
                { value: "postmenopausal", label: "Pós-menopausa" },
              ]}
            />
          </CardContent>
        </Card>
      )}

      {/* Pergunta de tamanho final (para pré-menopausa) */}
      {mostrarPerguntaTamanhoFinal && (
        <Card>
          <CardContent className="pt-6">
            <MultipleChoiceQuestion
              pergunta="Qual é o tamanho?"
              value={tamanhoFinal}
              onValueChange={setTamanhoFinal}
              id="tamanho-final"
              opcoes={[
                { value: "menor-igual-5cm", label: "<= 5cm" },
                { value: "maior-5cm-menor-10cm", label: "> 5cm mas < 10cm" },
              ]}
            />
          </CardContent>
        </Card>
      )}

      {/* Recomendações */}
      {tamanhoFinal === "menor-igual-5cm" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-black dark:text-black">
                Nenhum Acompanhamento Recomendado!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {tamanhoFinal === "maior-5cm-menor-10cm" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-black dark:text-black">
                Acompanhamento por US em 2-3 Meses!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendação para Pós-menopausa precoce */}
      {statusMenopausa === "early-postmenopausal" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <p className="text-lg font-semibold text-black dark:text-black mb-4">
                Recomendações:
              </p>
              <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside">
                <li>Acompanhamento por US em 2-3 meses</li>
                <li>Especialista em US (se disponível)</li>
                <li>RM (com escore O-RADS MRI)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendação para Pós-menopausa tardia */}
      {statusMenopausa === "late-postmenopausal" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-black dark:text-black">
                Não deve ocorrer; recategorizar usando outros descritores do léxico.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendações para Cisto Dermoide */}
      {lesaoOvarianaTipoResposta === "typical-dermoid-cyst" && tamanhoDermoidCyst !== "" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <p className="text-lg font-semibold text-black dark:text-black mb-4">
                Recomendações:
              </p>
              <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside">
                <li>≤ 3 cm: Pode considerar acompanhamento por US em 12 meses</li>
                <li>&gt;3 cm mas &lt;10 cm: Se não for excisado cirurgicamente, acompanhamento por US em 12 meses</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendações para Endometrioma - Pré-menopausa */}
      {lesaoOvarianaTipoResposta === "typical-endometrioma" && 
       tamanhoEndometrioma === "menor-10cm" &&
       statusMenopausaEndometrioma === "premenopausal" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-black dark:text-black">
                Se não for excisado cirurgicamente, acompanhamento por US em 12 meses
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendações para Endometrioma - Pós-menopausa */}
      {lesaoOvarianaTipoResposta === "typical-endometrioma" && 
       tamanhoEndometrioma === "menor-10cm" &&
       statusMenopausaEndometrioma === "postmenopausal" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <p className="text-lg font-semibold text-black dark:text-black mb-4">
                Recomendações:
              </p>
              <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside">
                <li>Acompanhamento por US em 2-3 meses</li>
                <li>Especialista em US (se disponível)</li>
                <li>RM (com escore O-RADS MRI)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendações para Endometrioma >= 10cm */}
      {lesaoOvarianaTipoResposta === "typical-endometrioma" && 
       tamanhoEndometrioma === "maior-igual-10cm" && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-black dark:text-black mb-3">
                  Imagem:
                </p>
                <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                  <li>Se não for excisado cirurgicamente, considerar acompanhamento por US em até 6 meses</li>
                  <li>Se sólido, pode considerar especialista em US (se disponível) ou RM (com escore O-RADS MRI)</li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-semibold text-black dark:text-black mb-2">
                  Clínico:
                </p>
                <p className="text-base text-black dark:text-black">
                  Ginecologista
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exibir ResultCard quando o score for calculado */}
      {score !== null && (
        <ResultCard score={score} />
      )}
    </>
  );
}

