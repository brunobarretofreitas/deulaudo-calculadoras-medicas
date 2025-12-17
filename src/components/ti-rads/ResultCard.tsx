import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  totalPoints: number;
}

const getTIRadsClassification = (points: number) => {
  if (points <= 1) {
    return {
      tr: "TR1",
      classificacao: "Benigno",
      colorClass: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
      textColorClass: "text-black-900 dark:text-black-100",
      recomendacoes: ["Não realizar PAAF"],
    };
  } else if (points === 2) {
    return {
      tr: "TR2",
      classificacao: "Não Suspeito",
      colorClass: "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700",
      textColorClass: "text-black-900 dark:text-black-100",
      recomendacoes: ["Não realizar PAAF"],
    };
  } else if (points === 3) {
    return {
      tr: "TR3",
      classificacao: "Levemente Suspeito",
      colorClass: "bg-yellow-200 dark:bg-yellow-900/30 border-yellow-400 dark:border-yellow-600",
      textColorClass: "text-black-900 dark:text-black-100",
      recomendacoes: [
        "PAAF se ≥ 2,5 cm",
        "Acompanhamento se ≥ 1,5 cm (aos 1, 3, 5 anos)",
      ],
    };
  } else if (points >= 4 && points <= 6) {
    return {
      tr: "TR4",
      classificacao: "Moderadamente Suspeito",
      colorClass: "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700",
      textColorClass: "text-black-900 dark:text-black-100",
      recomendacoes: [
        "PAAF se ≥ 1,5 cm",
        "Acompanhamento se ≥ 1 cm (aos 1, 2, 3 e 5 anos)",
      ],
    };
  } else {
    return {
      tr: "TR5",
      classificacao: "Altamente Suspeito",
      colorClass: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
      textColorClass: "text-black-900 dark:text-black-100",
      recomendacoes: [
        "PAAF se ≥ 1 cm",
        "Acompanhamento se ≥ 0,5 cm*",
      ],
    };
  }
};

export function ResultCard({ totalPoints }: ResultCardProps) {
  const data = getTIRadsClassification(totalPoints);
  const pontosExibicao = Number.isNaN(totalPoints) || totalPoints === undefined ? 0 : totalPoints;

  return (
    <Card className={cn("border-2", data.colorClass)}>
      <CardHeader>
        <CardTitle className={cn("text-2xl", data.textColorClass)}>
          Classificação TI-RADS: {data.tr}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-2">
            Pontuação Total
          </p>
          <p className={cn("text-3xl font-bold", data.textColorClass)}>
            {pontosExibicao} {pontosExibicao === 1 ? "ponto" : "pontos"}
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-2">
            Classificação
          </p>
          <p className={cn("text-lg font-medium", data.textColorClass)}>
            {data.classificacao}
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-2">
            Recomendações
          </p>
          <ul className="space-y-1">
            {data.recomendacoes.map((rec, index) => (
              <li key={index} className={cn("text-base", data.textColorClass)}>
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

