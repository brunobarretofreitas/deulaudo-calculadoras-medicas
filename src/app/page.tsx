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

  // Agrupar calculadoras por letra inicial
  const calculadorasAgrupadas = calculadoras.reduce((acc, calculadora) => {
    const primeiraLetra = calculadora.nome.charAt(0).toUpperCase();
    if (!acc[primeiraLetra]) {
      acc[primeiraLetra] = [];
    }
    acc[primeiraLetra].push(calculadora);
    return acc;
  }, {} as Record<string, typeof calculadoras>);

  // Ordenar as letras e as calculadoras dentro de cada grupo
  const letrasOrdenadas = Object.keys(calculadorasAgrupadas).sort();
  letrasOrdenadas.forEach((letra) => {
    calculadorasAgrupadas[letra].sort((a, b) => a.nome.localeCompare(b.nome));
  });

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

          <div className="flex flex-col gap-6">
            {letrasOrdenadas.map((letra) => (
              <div key={letra} className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-foreground border-b pb-2">
                  {letra}
                </h2>
                <div className="flex flex-col gap-4">
                  {calculadorasAgrupadas[letra].map((calculadora) => (
                    <Link key={calculadora.id} href={calculadora.href}>
                      <Card className="w-full transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer">
                        <CardHeader>
                          <CardTitle>{calculadora.nome}</CardTitle>
                          <CardDescription>{calculadora.descricao}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
