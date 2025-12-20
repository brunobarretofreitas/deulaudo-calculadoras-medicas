"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BackToCalculatorsButton } from "@/components/BackToCalculatorsButton";

export default function HepaticSteatosisMRI() {
  const [hepaticSIInPhase, setHepaticSIInPhase] = useState<string>("");
  const [spleenSIInPhase, setSpleenSIInPhase] = useState<string>("");
  const [hepaticSIOutPhase, setHepaticSIOutPhase] = useState<string>("");
  const [spleenSIOutPhase, setSpleenSIOutPhase] = useState<string>("");

  // Função para classificar a esteatose
  const getClassification = (value: number): { label: string; color: string } => {
    if (value < 5) {
      return { label: "Sem esteatose significativa", color: "text-green-700 dark:text-green-300" };
    } else if (value < 15) {
      return { label: "Esteatose leve", color: "text-yellow-700 dark:text-yellow-300" };
    } else if (value < 30) {
      return { label: "Esteatose moderada", color: "text-orange-700 dark:text-orange-300" };
    } else {
      return { label: "Esteatose grave", color: "text-red-700 dark:text-red-300" };
    }
  };

  // Calcular HFF (Hepatic Fat Fraction)
  const hff = useMemo(() => {
    const hepaticIn = parseFloat(hepaticSIInPhase);
    const hepaticOut = parseFloat(hepaticSIOutPhase);

    // Verificar se os valores hepáticos são válidos
    if (isNaN(hepaticIn) || isNaN(hepaticOut) || hepaticIn === 0) {
      return null;
    }

    // HFF = 100 x ([Hepatic SI in-phase] - [Hepatic SI out-of-phase]) / (2 x [Hepatic SI in-phase])
    const hffValue = (100 * (hepaticIn - hepaticOut)) / (2 * hepaticIn);
    
    return hffValue;
  }, [hepaticSIInPhase, hepaticSIOutPhase]);

  // Calcular HFP (Hepatic Fat Percentage)
  const hfp = useMemo(() => {
    const hepaticIn = parseFloat(hepaticSIInPhase);
    const hepaticOut = parseFloat(hepaticSIOutPhase);
    const spleenIn = parseFloat(spleenSIInPhase);
    const spleenOut = parseFloat(spleenSIOutPhase);

    // Verificar se todos os valores são válidos
    if (
      isNaN(hepaticIn) ||
      isNaN(hepaticOut) ||
      isNaN(spleenIn) ||
      isNaN(spleenOut) ||
      hepaticIn === 0 ||
      spleenIn === 0
    ) {
      return null;
    }

    // HFP = 100 x (([Hepatic SI in-phase] / [Spleen SI in-phase]) - ([Hepatic SI out-of-phase] / [Spleen SI out-of-phase])) / (2 x ([Hepatic SI in-phase] / [Spleen SI in-phase]))
    const hepaticRatio = hepaticIn / spleenIn;
    const hepaticOutRatio = hepaticOut / spleenOut;
    
    // Evitar divisão por zero
    if (hepaticRatio === 0) {
      return null;
    }
    
    const hfpValue = (100 * (hepaticRatio - hepaticOutRatio)) / (2 * hepaticRatio);
    
    return hfpValue;
  }, [hepaticSIInPhase, spleenSIInPhase, hepaticSIOutPhase, spleenSIOutPhase]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-4xl flex-col py-16 px-8">
        <div className="w-full max-w-2xl space-y-6">
          <BackToCalculatorsButton className="mb-8" />

          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Calculadora de Esteatose Hepática por Ressonância Magnética
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-12">
            Calculadora para avaliação de esteatose hepática utilizando sequências em fase e fora de fase.
          </p>

          {/* Seção de Fórmulas e Classificação */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Fórmulas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-sm">Fração de Gordura Hepática (HFF):</p>
                <p className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  HFF = 100 × ([SI Hepático em fase] - [SI Hepático fora de fase]) / (2 × [SI Hepático em fase])
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-sm">Porcentagem de Gordura Hepática (HFP):</p>
                <p className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  HFP = 100 × (([SI Hepático em fase] / [SI Esplênico em fase]) - ([SI Hepático fora de fase] / [SI Esplênico fora de fase])) / (2 × ([SI Hepático em fase] / [SI Esplênico em fase]))
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Classificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">%</th>
                      <th className="text-left p-2 font-semibold">Classificação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">&lt; 5</td>
                      <td className="p-2">Sem esteatose significativa</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">5 ≤ valor &lt; 15</td>
                      <td className="p-2">Esteatose leve</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">15 ≤ valor &lt; 30</td>
                      <td className="p-2">Esteatose moderada</td>
                    </tr>
                    <tr>
                      <td className="p-2">≥ 30</td>
                      <td className="p-2">Esteatose grave</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Esteatose Hepática</CardTitle>
              <CardDescription>
                Insira os valores de intensidade de sinal (SI) para calcular a fração de gordura hepática.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Título Entradas */}
              <div className="relative">
                {/* Notas informativas */}
                <div className="flex gap-3 mb-6 flex-wrap">
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded px-3 py-2 text-sm">
                    Números inteiros e decimais
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded px-3 py-2 text-sm">
                    Sem limite para min e máx
                  </div>
                </div>
              </div>

              {/* Campos de entrada */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hepatic-si-in-phase" className="text-base font-semibold">
                    SI Hepático em fase:
                  </Label>
                  <Input
                    id="hepatic-si-in-phase"
                    type="number"
                    step="any"
                    value={hepaticSIInPhase}
                    onChange={(e) => setHepaticSIInPhase(e.target.value)}
                    placeholder="Digite o valor"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spleen-si-in-phase" className="text-base font-semibold">
                    SI Esplênico em fase:
                  </Label>
                  <Input
                    id="spleen-si-in-phase"
                    type="number"
                    step="any"
                    value={spleenSIInPhase}
                    onChange={(e) => setSpleenSIInPhase(e.target.value)}
                    placeholder="Digite o valor"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hepatic-si-out-phase" className="text-base font-semibold">
                    SI Hepático fora de fase:
                  </Label>
                  <Input
                    id="hepatic-si-out-phase"
                    type="number"
                    step="any"
                    value={hepaticSIOutPhase}
                    onChange={(e) => setHepaticSIOutPhase(e.target.value)}
                    placeholder="Digite o valor"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spleen-si-out-phase" className="text-base font-semibold">
                    SI Esplênico fora de fase:
                  </Label>
                  <Input
                    id="spleen-si-out-phase"
                    type="number"
                    step="any"
                    value={spleenSIOutPhase}
                    onChange={(e) => setSpleenSIOutPhase(e.target.value)}
                    placeholder="Digite o valor"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Resultados */}
              {(hff !== null || hfp !== null) && (
                <div className="space-y-4 mt-6">
                  {/* Resultado HFF */}
                  {hff !== null && (
                    <Card className="bg-gray-100 border-gray-300">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-black mb-2">
                              Fração de Gordura Hepática (HFF)
                            </p>
                            <p className="text-3xl font-bold text-black">
                              {hff.toFixed(2)}%
                            </p>
                          </div>
                          <div className="text-center border-t border-gray-300 dark:border-gray-600 pt-3">
                            <p className={`text-lg font-semibold`}>
                              {getClassification(hff).label}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Resultado HFP */}
                  {hfp !== null && (
                    <Card className="bg-gray-100  border-gray-300 dark:border-gray-700">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-black mb-2">
                              Porcentagem de Gordura Hepática (HFP)
                            </p>
                            <p className="text-3xl font-bold text-black">
                              {hfp.toFixed(2)}%
                            </p>
                          </div>
                          <div className="text-center border-t border-gray-300 dark:border-gray-600 pt-3">
                            <p className={`text-lg font-semibold`}>
                              {getClassification(hfp).label}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

