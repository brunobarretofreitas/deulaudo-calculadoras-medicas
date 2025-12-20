import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const calculadoras = [
    {
      id: "orads-mri",
      nome: "O-RADS MRI",
      descricao: "Calculadora O-RADS MRI para avaliação de lesões ovarianas",
      href: "/calculadoras/orads-mri",
    },
    {
      id: "orads-usg",
      nome: "O-RADS USG",
      descricao: "Calculadora O-RADS USG para avaliação de lesões ovarianas",
      href: "/calculadoras/orads-usg",
    },
    {
      id: "ti-rads",
      nome: "TI-RADS",
      descricao: "Calculadora TI-RADS para avaliação de nódulos tireoidianos",
      href: "/calculadoras/ti-rads",
    },
    {
      id: "hepatic-steatosis-mri",
      nome: "Esteatose Hepática por RM",
      descricao: "Calculadora para avaliação de esteatose hepática utilizando sequências em fase e fora de fase",
      href: "/calculadoras/hepatic-steatosis-mri",
    },
    {
      id: "ferro-hepatico",
      nome: "Quantificação de Ferro Hepático",
      descricao: "Calculadora para avaliação de concentração de ferro hepático (LIC) utilizando valores de R2* e T2*",
      href: "/calculadoras/ferro-hepatico",
    },
    // {
    //   id: "crescimento-fetal-doppler",
    //   nome: "Crescimento Fetal + Doppler",
    //   descricao: "Calculadora para avaliação de crescimento fetal e índices Doppler, baseada nas referências FMF/Barcelona",
    //   href: "/calculadoras/crescimento-fetal-doppler",
    // },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center py-16 px-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-2">
            Calculadoras Médicas
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-12">
            Ferramentas de cálculo médico para auxiliar na prática clínica.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {calculadoras.map((calculadora) => (
              <Link key={calculadora.id} href={calculadora.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  <CardHeader>
                    <CardTitle>{calculadora.nome}</CardTitle>
                    <CardDescription>{calculadora.descricao}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
