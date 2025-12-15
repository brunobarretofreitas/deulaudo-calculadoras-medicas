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
    classificacao: "Ovário Normal",
    colorClass: "bg-blue-100 dark:bg-blue-900/10 border-blue-300 dark:border-blue-700",
    textColorClass: "text-blue-400 dark:text-blue-400",
  },
  2: {
    classificacao: "Quase Certamente Benigno [<1%]",
    colorClass: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
    textColorClass: "text-black-900 dark:text-black-100",
  },
  3: {
    classificacao: "Baixo Risco [1 - <10%]",
    colorClass: "bg-[#FFFF0080] border-yellow-38 dark:border-yellow-700",
    textColorClass: "text-black-900 dark:text-black-100",
  },
  4: {
    classificacao: "Risco Intermediário [10 -< 50%]",
    colorClass: "bg-[#FFA500] border-orange-300 dark:border-orange-700",
    textColorClass: "text-black-900 dark:text-black-100",
  },
  5: {
    classificacao: "Alto Risco [>50%]",
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
          Resultado O-RADS USG
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-sm text-black-900 dark:text-black-100 mb-2">
              O-RADS Risk Score
            </p>
            <p className={cn("text-3xl font-bold", data.textColorClass)}>
              {score}
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
        </div>
      </CardContent>
    </Card>
  );
}

