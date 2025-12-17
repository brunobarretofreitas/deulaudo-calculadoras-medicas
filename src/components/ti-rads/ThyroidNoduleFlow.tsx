"use client";

import { useState, useMemo, useEffect } from "react";
import { ScoredMultipleChoiceQuestion } from "@/components/ScoredMultipleChoiceQuestion";
import { ScoredMultipleSelectQuestion } from "@/components/ScoredMultipleSelectQuestion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ThyroidNoduleFlowProps {
  onPointsChange?: (points: number) => void;
  onHasAnswersChange?: (hasAnswers: boolean) => void;
}

export function ThyroidNoduleFlow({ onPointsChange, onHasAnswersChange }: ThyroidNoduleFlowProps) {
  const [ecogenicidade, setEcogenicidade] = useState<string>("");
  const [ecogenicidade2, setEcogenicidade2] = useState<string>("");
  const [forma, setForma] = useState<string>("");
  const [margem, setMargem] = useState<string>("");
  const [focosEcogenicos, setFocosEcogenicos] = useState<string[]>([]);

  // Mapeamento de pontos para cada opção
  const pontosEcogenicidade: Record<string, number> = {
    cystic: 0,
    spongiform: 0,
    mixed: 1,
    solid: 2,
    indeterminate: 2,
  };

  const pontosEcogenicidade2: Record<string, number> = {
    anechoic: 0,
    "hyperechoic-isoechoic": 1,
    hypoechoic: 2,
    "cannot-be-determined": 1,
  };

  const pontosForma: Record<string, number> = {
    "wider-than-tall": 0,
    "taller-than-wide": 3,
  };

  const pontosMargem: Record<string, number> = {
    smooth: 0,
    "ill-defined": 0,
    "lobulated-irregular": 2,
    "extrathyroidal-extension": 3,
    "cannot-be-determined": 0,
  };

  const pontosFocosEcogenicos: Record<string, number> = {
    "none-comet-tail": 0,
    macrocalcifications: 1,
    "peripheral-calcifications": 2,
    "punctate-echogenic-foci": 3,
  };

  // Calcular pontos totais
  const totalPoints = useMemo(() => {
    let pontos = 0;

    // Se for espongiforme, não adiciona pontos de outras categorias
    if (ecogenicidade === "spongiform") {
      return 0;
    }

    // Somar pontos da primeira pergunta de ecogenicidade
    if (ecogenicidade) {
      pontos += pontosEcogenicidade[ecogenicidade] || 0;
    }

    // Somar pontos da segunda pergunta de ecogenicidade
    if (ecogenicidade2) {
      pontos += pontosEcogenicidade2[ecogenicidade2] || 0;
    }

    // Pontos da forma
    if (forma) {
      pontos += pontosForma[forma] || 0;
    }

    // Pontos da margem
    if (margem) {
      pontos += pontosMargem[margem] || 0;
    }

    // Pontos dos focos ecogênicos (somar todos os valores selecionados)
    if (focosEcogenicos.length > 0) {
      const pontosFocos = focosEcogenicos.map(
        (foco) => pontosFocosEcogenicos[foco] || 0
      );
      pontos += pontosFocos.reduce((sum, p) => sum + p, 0);
    }

    const pontosFinais = Number.isNaN(pontos) ? 0 : pontos;
    return pontosFinais;
  }, [ecogenicidade, ecogenicidade2, forma, margem, focosEcogenicos]);

  // Verificar se há respostas
  const hasAnswers = ecogenicidade !== "" || ecogenicidade2 !== "" || forma !== "" || margem !== "" || focosEcogenicos.length > 0;

  // Notificar mudança de pontos e respostas quando mudarem
  useEffect(() => {
    if (onPointsChange) {
      onPointsChange(totalPoints);
    }
    if (onHasAnswersChange) {
      onHasAnswersChange(hasAnswers);
    }
  }, [totalPoints, hasAnswers, onPointsChange, onHasAnswersChange]);

  // Verificar se deve mostrar alertas
  const mostrarAlertaAnechoic = ecogenicidade2 === "anechoic";
  const mostrarAlertaSpongiform = ecogenicidade === "spongiform";
  const mostrarAlertaCystic = ecogenicidade === "cystic";

  return (
    <>
      {/* Pergunta 1: Ecogenicidade */}
      <ScoredMultipleChoiceQuestion
        pergunta="Ecogenicidade (Escolha 1)"
        value={ecogenicidade}
        onValueChange={setEcogenicidade}
        id="ecogenicidade"
        opcoes={[
          {
            value: "cystic",
            label: "Cístico ou quase completamente cístico",
            points: 0,
          },
          {
            value: "spongiform",
            label: "Espongiforme",
            points: 0,
          },
          {
            value: "mixed",
            label: "Misto cístico e sólido",
            points: 1,
          },
          {
            value: "solid",
            label: "Sólido ou quase completamente sólido",
            points: 2,
          },
          {
            value: "indeterminate",
            label: "Indeterminado devido à calcificação",
            points: 2,
          },
        ]}
        definitions={[
          {
            term: "Espongiforme",
            description: "Composto predominantemente (>50%) de pequenos espaços císticos. Nenhum ponto adicional é adicionado para outras categorias.",
          },
          {
            term: "Misto cístico e sólido",
            description: "Atribuir pontos para o componente sólido predominante.",
          },
        ]}
        showBorder
      />

      {/* Pergunta 2: Ecogenicidade (segunda versão) */}
      <ScoredMultipleChoiceQuestion
        pergunta="Ecogenicidade (Escolha 1)"
        value={ecogenicidade2}
        onValueChange={setEcogenicidade2}
        id="ecogenicidade-2"
        opcoes={[
          {
            value: "anechoic",
            label: "Anecoico",
            points: 0,
          },
          {
            value: "hyperechoic-isoechoic",
            label: "Hiperecogênico ou isoecogênico",
            points: 1,
          },
          {
            value: "hypoechoic",
            label: "Hipoecogênico",
            points: 2,
          },
          {
            value: "cannot-be-determined",
            label: "Não pode ser determinado",
            points: 1,
          },
        ]}
        definitions={[
          {
            term: "Anecoico",
            description: "Aplica-se a nódulos císticos ou quase completamente císticos.",
          },
          {
            term: "Hiperecogênico/isoecogênico/hipoecogênico",
            description: "Comparado ao parênquima adjacente.",
          },
          {
            term: "Muito hipoecogênico",
            description: "Mais hipoecogênico que os músculos estriados.",
          },
        ]}
        showBorder
      />

      {/* Pergunta 3: Forma */}
      <ScoredMultipleChoiceQuestion
        pergunta="Forma (Escolha 1)"
        value={forma}
        onValueChange={setForma}
        id="forma"
        opcoes={[
          {
            value: "wider-than-tall",
            label: "Mais largo que alto",
            points: 0,
          },
          {
            value: "taller-than-wide",
            label: "Mais alto que largo",
            points: 3,
          },
        ]}
        definitions={[
          {
            term: "Instrução",
            description: "A forma deve ser avaliada em uma imagem transversal com medidas paralelas ao feixe de som para altura e perpendiculares ao feixe de som para largura.",
          },
        ]}
        showBorder
      />

      {/* Pergunta 4: Margem */}
      <ScoredMultipleChoiceQuestion
        pergunta="Margem (Escolha 1)"
        value={margem}
        onValueChange={setMargem}
        id="margem"
        opcoes={[
          {
            value: "smooth",
            label: "Lisa",
            points: 0,
          },
          {
            value: "ill-defined",
            label: "Mal definida",
            points: 0,
          },
          {
            value: "lobulated-irregular",
            label: "Lobulada ou irregular",
            points: 2,
          },
          {
            value: "extrathyroidal-extension",
            label: "Extensão extratireoidiana",
            points: 3,
          },
          {
            value: "cannot-be-determined",
            label: "Não pode ser determinado",
            points: 0,
          },
        ]}
        definitions={[
          {
            term: "Lobulada",
            description: "Protrusões no parênquima adjacente.",
          },
          {
            term: "Irregular",
            description: "Angular, espiculada ou com ângulos agudos.",
          },
          {
            term: "Extensão extratireoidiana",
            description: "Invasão óbvia de tecido mole adjacente ou estruturas vasculares.",
          },
        ]}
        showBorder
      />

      {/* Pergunta 5: Focos Ecogênicos */}
      <ScoredMultipleSelectQuestion
        pergunta="Focos Ecogênicos (Escolha todas as que se aplicam)"
        value={focosEcogenicos}
        onValueChange={setFocosEcogenicos}
        id="focos-ecogenicos"
        opcoes={[
          {
            value: "none-comet-tail",
            label: "Nenhum ou grandes artefatos de cauda de cometa",
            points: 0,
          },
          {
            value: "macrocalcifications",
            label: "Macrocalcificações",
            points: 1,
          },
          {
            value: "peripheral-calcifications",
            label: "Calcificações periféricas (margem)",
            points: 2,
          },
          {
            value: "punctate-echogenic-foci",
            label: "Focos ecogênicos puntiformes",
            points: 3,
          },
        ]}
        definitions={[
          {
            term: "Grandes artefatos de cauda de cometa",
            description: "Em forma de V, maiores que 1 mm, encontrados em componentes císticos.",
          },
          {
            term: "Macrocalcificações",
            description: "Causam sombra acústica.",
          },
          {
            term: "Calcificações periféricas",
            description: "Completas ou incompletas ao longo da margem.",
          },
          {
            term: "Focos ecogênicos puntiformes",
            description: "Sem sombra acústica e podem ter pequenos artefatos de cauda de cometa.",
          },
        ]}
        showBorder
      />

      {/* Alertas */}
      {mostrarAlertaAnechoic && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-black dark:text-black flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black dark:text-black mb-1">
                  Aviso
                </p>
                <p className="text-sm text-black dark:text-black">
                  Anecoico aplica-se a nódulos císticos ou quase completamente císticos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {mostrarAlertaSpongiform && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-black dark:text-black flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black dark:text-black mb-1">
                  Aviso
                </p>
                <p className="text-sm text-black dark:text-black">
                  Para um nódulo espongiforme, nenhuma outra característica contribui pontos!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {mostrarAlertaCystic && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-black dark:text-black flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-black dark:text-black mb-1">
                  Aviso
                </p>
                <p className="text-sm text-black dark:text-black">
                  Nódulos císticos são quase sempre benignos. Verifique cuidadosamente as características selecionadas acima.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </>
  );
}

