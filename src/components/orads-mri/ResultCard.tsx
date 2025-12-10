import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  score: number;
}

const scoreData = {
  1: {
    risco: "Ovários normais",
    ppv: "N/A",
    caracteristicas: [
      "Nenhuma lesão ovariana",
      "Folículo definido como cisto simples ≤ 3 cm em mulher pré-menopáusica",
      "Cisto hemorrágico ≤ 3 cm em mulher pré-menopáusica",
      "Corpo lúteo com ou sem hemorragia ≤ 3 cm em mulher pré-menopáusica",
    ],
    colorClass: "bg-blue-100 dark:bg-blue-900/10 border-blue-300 dark:border-blue-700",
    textColorClass: "text-blue-400 dark:text-blue-400",
  },
  2: {
    risco: "Quase certamente benigno",
    ppv: "<0.5%",
    caracteristicas: [
      "Cisto: Unilocular – qualquer tipo de conteúdo líquido (Sem realce da parede; Sem tecido sólido com realce)",
      "Cisto: Unilocular – conteúdo líquido simples ou endometriótico (Parede lisa com realce; Sem tecido sólido com realce)",
      "Lesão com conteúdo lipídico (Sem tecido sólido com realce)",
      "Lesão com tecido sólido \"escuro em T2/escuro em DWI\" (Hipointenso de forma homogênea em T2 e DWI)",
      "Trompa dilatada – conteúdo líquido simples (Parede fina e lisa/dobras endossalpíngeas com realce; Sem tecido sólido com realce)",
      "Cisto paraovariano – qualquer tipo de líquido (Parede fina e lisa, com ou sem realce; Sem tecido sólido com realce)",
    ],
    colorClass: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
    textColorClass: "text-black-900 dark:text-black-100",
  },
  3: {
    risco: "Baixo risco",
    ppv: "~5%",
    caracteristicas: [
      "Cisto: Unilocular – conteúdo líquido proteináceo, hemorrágico ou mucinoso (Parede lisa com realce; Sem tecido sólido com realce)",
      "Cisto: Multilocular – qualquer tipo de conteúdo líquido, sem conteúdo lipídico (Septo e parede lisos com realce; Sem tecido sólido com realce)",
      "Lesão com tecido sólido (excluindo T2 escuro/DWI escuro) (Curva tempo-intensidade de baixo risco na RM com DCE)",
      "Trompa de Falópio dilatada (Líquido não simples: parede/dobras finas; Líquido simples: parede/dobras espessas e lisas; Sem tecido sólido com realce)",
    ],
    colorClass: "bg-[#FFFF0080] border-yellow-38 dark:border-yellow-700",
    textColorClass: "text-black-900 dark:text-black-100",
  },
  4: {
    risco: "Risco intermediário",
    ppv: "~50%",
    caracteristicas: [
      {
        main: "Lesão com tecido sólido (excluindo T2 escuro/DWI escuro)",
        subitems: [
          "Curva tempo–intensidade de risco intermediário na RM com DCE",
          "Se a RM com DCE não for possível, o escore 4 corresponde a qualquer lesão com tecido sólido (excluindo T2 escuro/DWI escuro) cujo realce seja ≤ o do miométrio aos 30–40 s na RM sem DCE",
        ],
      },
      {
        main: "Lesão com conteúdo lipídico",
        subitems: [
          "Grande volume de tecido sólido com realce",
        ],
      },
    ],
    colorClass: "bg-[#FFA500] border-orange-300 dark:border-orange-700",
    textColorClass: "text-black-900 dark:text-black-100",
  },
  5: {
    risco: "Alto risco",
    ppv: "~90%",
    caracteristicas: [
      {
        main: "Lesão com tecido sólido (excluindo T2 escuro/DWI escuro)",
        subitems: [
          "Curva tempo–intensidade de alto risco na RM com DCE",
          "Se a RM com DCE não for possível, o escore 5 corresponde a qualquer lesão com tecido sólido (excluindo T2 escuro/DWI escuro) cujo realce seja > o do miométrio aos 30–40 s na RM sem DCE",
        ],
      },
      "Nodularidade ou espessamento irregular do peritônio, mesentério ou omento, com ou sem ascite.",
    ],
    colorClass: "bg-red-500 border-red-300 dark:border-red-700",
    textColorClass: "text-white/80",
  },
};

export function ResultCard({ score }: ResultCardProps) {
  const data = scoreData[score as keyof typeof scoreData];

  if (!data) {
    return null;
  }

  return (
    <Card className={cn("border-2", data.colorClass)}>
      <CardHeader>
        <CardTitle className={cn("text-2xl", data.textColorClass)}>
          O-RADS Risk Score: {score}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-1">
            Risco:
          </p>
          <p className={cn("text-lg font-medium", data.textColorClass)}>
            {data.risco}
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-1">
            PPV para Malignidade:
          </p>
          <p className={cn("text-lg font-medium", data.textColorClass)}>
            {data.ppv}
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-2">
            Características:
          </p>
          <ul className={cn("space-y-2 text-base list-disc list-inside", data.textColorClass)}>
            {data.caracteristicas.map((caracteristica, index) => {
              if (typeof caracteristica === "string") {
                return (
                  <li key={index} className="leading-relaxed">
                    {caracteristica}
                  </li>
                );
              } else {
                // Característica com subitens
                return (
                  <li key={index} className="leading-relaxed">
                    <span className="font-medium">{caracteristica.main}</span>
                    <ul className="mt-1 ml-4 space-y-1 list-disc">
                      {caracteristica.subitems.map((subitem, subIndex) => (
                        <li key={subIndex} className="text-sm leading-relaxed">
                          {subitem}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
