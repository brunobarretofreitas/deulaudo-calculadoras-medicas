"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BackToCalculatorsButton } from "@/components/BackToCalculatorsButton";

// Função para converter mg/g para µmol/g
// Primeiro arredonda o valor em mg/g para 1 decimal, depois converte
const convertToMicromol = (mgPerG: number): number => {
  const mgPerGRounded = Math.round(mgPerG * 10) / 10;
  return mgPerGRounded * 17.9;
};

// Função para formatar número removendo .0 quando aplicável
const formatNumber = (num: number): string => {
  return num.toFixed(1).replace(/\.0$/, '');
};

// Função para classificar o LIC
const getClassification = (lic: number): { label: string; comment: string } => {
  if (lic < 2) {
    return { label: "Ausente", comment: "Normal" };
  } else if (lic >= 2 && lic < 4) {
    return {
      label: "Insignificante",
      comment: "Geralmente sem tratamento (exceto se HH); follow up",
    };
  } else if (lic >= 4 && lic < 6) {
    return {
      label: "Leve",
      comment: "Tratamento depende do perfil do paciente",
    };
  } else if (lic >= 6 && lic < 8) {
    return {
      label: "Moderada",
      comment: "Geralmente tratada (exceto se causa hematológica)",
    };
  } else if (lic >= 8 && lic < 16) {
    return {
      label: "Moderada-grave",
      comment: "Comum apenas na HH e causas hematológicas",
    };
  } else {
    return {
      label: "Grave",
      comment: "Maior risco cardíaco",
    };
  }
};

export default function FerroHepatico() {
  const [r2Star15T, setR2Star15T] = useState<string>("");
  const [r2Star30T, setR2Star30T] = useState<string>("");

  // Cálculos para 1.5 Tesla
  const calculations15T = useMemo(() => {
    debugger;
    const r2 = parseFloat(r2Star15T);
    if (isNaN(r2) || r2 <= 0) {
      return null;
    }

    const t2Star = 1000 / r2;
    const licGarbowskyCalculated = 0.029 * Math.pow(r2, 1.014);
    const licGarbowskyMg = r2 >= 100 
      ? Math.floor(licGarbowskyCalculated * 10) / 10
      : licGarbowskyCalculated;
    const licGarbowskyMicromol = convertToMicromol(licGarbowskyMg);
    const licReederCalculated = (0.0262 * r2) + 0.04;
    const secondDecimal = Math.floor(licReederCalculated * 100) % 10;
    const licReederMg = secondDecimal < 5 
      ? Math.floor(licReederCalculated * 10) / 10 
      : Math.ceil(licReederCalculated * 10) / 10;
    const licReederMicromol = parseFloat((licReederMg * 17.9).toFixed(1));

    return {
      t2Star,
      licGarbowskyMg,
      licGarbowskyMicromol,
      licReederMg,
      licReederMicromol,
    };
  }, [r2Star15T]);

  // Cálculos para 3.0 Tesla
  const calculations30T = useMemo(() => {
    const r2 = parseFloat(r2Star30T);
    if (isNaN(r2) || r2 <= 0) {
      return null;
    }
    debugger;
    const r2Star15TConverted = r2 / 2 + 5.5;
    const t2Star = 1000 / r2;
    const t2Star15T = 1000 / r2Star15TConverted;
    const licGarbowskyCalculated = 0.029 * Math.pow(r2Star15TConverted, 1.014);
    const licGarbowskyMg = r2 >= 100 
      ? (() => {
          const secondDecimal = Math.floor(licGarbowskyCalculated * 100) % 10;
          return secondDecimal < 5 
            ? Math.floor(licGarbowskyCalculated * 10) / 10 
            : Math.ceil(licGarbowskyCalculated * 10) / 10;
        })()
      : licGarbowskyCalculated;
    const licGarbowskyMicromol = convertToMicromol(licGarbowskyMg);
    const licReederMg = parseFloat((0.0141 * r2).toFixed(1));
    const licReederMicromol = parseFloat((licReederMg * 17.9).toFixed(1));

    return {
      r2Star15TConverted,
      t2Star,
      t2Star15T,
      licGarbowskyMg,
      licGarbowskyMicromol,
      licReederMg,
      licReederMicromol,
    };
  }, [r2Star30T]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-6xl flex-col py-16 px-8">
        <div className="w-full space-y-6">
          <BackToCalculatorsButton className="mb-8" />

          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Quantificação de Ferro Hepático
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-12">
            Calculadora para avaliação de concentração de ferro hepático (LIC) utilizando valores de R2* e T2* de ressonância magnética.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Coluna Esquerda: Entradas e Cálculos */}
            <div className="space-y-6">
              {/* Seção de Entradas */}
              <Card>
                <CardHeader>
                  <CardTitle className="bg-yellow-200 dark:bg-yellow-900/30 px-3 py-2 inline-block rounded">
                    Entradas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* 1.5 Tesla */}
                  <div className="bg-gray-100 p-4 rounded space-y-4">
                    <h3 className="text-lg font-semibold">1,5 Tesla</h3>
                    <div className="space-y-2">
                      <Label htmlFor="r2-15t" className="text-base font-semibold">
                        R2*:
                      </Label>
                      <Input
                        id="r2-15t"
                        type="number"
                        step="any"
                        value={r2Star15T}
                        onChange={(e) => setR2Star15T(e.target.value)}
                        placeholder="Digite o valor"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* 3.0 Tesla */}
                  <div className="bg-gray-100 p-4 rounded space-y-4">
                    <h3 className="text-lg font-semibold">3,0 Tesla</h3>
                    <div className="space-y-2">
                      <Label htmlFor="r2-30t" className="text-base font-semibold">
                        R2*:
                      </Label>
                      <Input
                        id="r2-30t"
                        type="number"
                        step="any"
                        value={r2Star30T}
                        onChange={(e) => setR2Star30T(e.target.value)}
                        placeholder="Digite o valor"
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção de Cálculos */}
              <Card>
                <CardHeader>
                  <CardTitle className="bg-yellow-200 dark:bg-yellow-900/30 px-3 py-2 inline-block rounded">
                    Cálculos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Cálculos 1.5 Tesla */}
                  {calculations15T && (
                    <div className="bg-gray-100 p-4 rounded space-y-3">
                      <h3 className="text-lg font-semibold">1,5 Tesla</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold">T2*:</span>{" "}
                          <span>{calculations15T.t2Star.toFixed(2)} ms</span>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <span className="font-semibold">LIC Garbowsky:</span>{" "}
                            <span>
                              {formatNumber(calculations15T.licGarbowskyMg)} mg/g e{" "}
                              {formatNumber(calculations15T.licGarbowskyMicromol)} µmol/g
                            </span>
                          </div>
                          {calculations15T.licGarbowskyMg >= 0 && (
                            <div className="text-xs text-muted-foreground pl-4">
                              {getClassification(calculations15T.licGarbowskyMg).label} - {getClassification(calculations15T.licGarbowskyMg).comment}
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div>
                            <span className="font-semibold">LIC Reeder:</span>{" "}
                            <span>
                              {formatNumber(calculations15T.licReederMg)} mg/g e{" "}
                              {formatNumber(calculations15T.licReederMicromol)} µmol/g
                            </span>
                          </div>
                          {calculations15T.licReederMg >= 0 && (
                            <div className="text-xs text-muted-foreground pl-4">
                              {getClassification(calculations15T.licReederMg).label} - {getClassification(calculations15T.licReederMg).comment}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cálculos 3.0 Tesla */}
                  {calculations30T && (
                    <div className="bg-gray-100 p-4 rounded space-y-3">
                      <h3 className="text-lg font-semibold">3,0 Tesla</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold">R2*(1,5T):</span>{" "}
                          <span>
                            {calculations30T.r2Star15TConverted.toFixed(2)} s⁻¹
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">T2*:</span>{" "}
                          <span>{calculations30T.t2Star.toFixed(2)} ms</span>
                        </div>
                        <div>
                          <span className="font-semibold">T2*(1,5T):</span>{" "}
                          <span>{calculations30T.t2Star15T.toFixed(2)} ms</span>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <span className="font-semibold">LIC Garbowsky:</span>{" "}
                            <span>
                              {formatNumber(calculations30T.licGarbowskyMg)} mg/g e{" "}
                              {formatNumber(calculations30T.licGarbowskyMicromol)} µmol/g
                            </span>
                          </div>
                          {calculations30T.licGarbowskyMg >= 0 && (
                            <div className="text-xs text-muted-foreground pl-4">
                              {getClassification(calculations30T.licGarbowskyMg).label} - {getClassification(calculations30T.licGarbowskyMg).comment}
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div>
                            <span className="font-semibold">LIC Reeder:</span>{" "}
                            <span>
                              {formatNumber(calculations30T.licReederMg)} mg/g e{" "}
                              {formatNumber(calculations30T.licReederMicromol)} µmol/g
                            </span>
                          </div>
                          {calculations30T.licReederMg >= 0 && (
                            <div className="text-xs text-muted-foreground pl-4">
                              {getClassification(calculations30T.licReederMg).label} - {getClassification(calculations30T.licReederMg).comment}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {!calculations15T && !calculations30T && (
                    <p className="text-muted-foreground text-sm">
                      Insira valores de R2* para ver os cálculos.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Seção de Observações */}
              <Card>
                <CardHeader>
                  <CardTitle className="bg-yellow-200 dark:bg-yellow-900/30 px-3 py-2 inline-block rounded">
                    Observações
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    O resultado pode variar de acordo com o equipamento utilizado para obter os valores de R2*. Nesse sentido, a calculadora ajusta os cálculos dependendo da máquina usada, por isso ela calcula tanto para a máquina 1,5 Tesla quanto para a 3,0 Tesla.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Coluna Direita: Fórmulas, Conversão e Classificação */}
            <div className="space-y-6">
              {/* Seção de Fórmulas */}
              <Card>
                <CardHeader>
                  <CardTitle className="bg-yellow-200 dark:bg-yellow-900/30 px-3 py-2 inline-block rounded">
                    Fórmulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Fórmulas 1.5 Tesla */}
                  <div className="bg-gray-100 p-4 rounded space-y-3">
                    <h3 className="text-lg font-semibold">1,5 Tesla</h3>
                    <div className="space-y-2 text-sm font-mono">
                      <div>T2* = 1000 / [R2*]</div>
                      <div>LIC Garbowsky = 0,029 × (R2*^1,014)</div>
                      <div>LIC Reeder = 0,0262 × R2* + 0,04</div>
                    </div>
                  </div>

                  {/* Fórmulas 3.0 Tesla */}
                  <div className="bg-gray-100 p-4 rounded space-y-3">
                    <h3 className="text-lg font-semibold">3,0 Tesla</h3>
                    <div className="space-y-2 text-sm font-mono">
                      <div>T2* = 1000 / [R2*]</div>
                      <div>T2*(1,5T) = 1000 / R2*(1,5T)</div>
                      <div>R2*(1,5T) = (R2* / 2) + 5,5</div>
                      <div>LIC Garbowsky = 0,029 × (R2*(1,5T)^1,014) (mg/g)</div>
                      <div>LIC Reeder = 0,0141 × R2* (mg/g)</div>
                    </div>
                  </div>

                  {/* Conversão de unidades */}
                  <div className="bg-gray-100 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2 bg-yellow-200 dark:bg-yellow-900/30 px-3 py-2 inline-block rounded">
                      Conversão de unidades:
                    </h3>
                    <div className="text-sm font-mono mt-2">
                      LIC (µmol/g) = LIC (mg/g) × 17,9
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seção de Classificação */}
              <Card>
                <CardHeader>
                  <CardTitle className="bg-yellow-200 dark:bg-yellow-900/30 px-3 py-2 inline-block rounded">
                    Classificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-semibold">Classificação</th>
                          <th className="text-left p-2 font-semibold">LIC (mg/g)</th>
                          <th className="text-left p-2 font-semibold">Comentário</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Ausente</td>
                          <td className="p-2">&lt; 2</td>
                          <td className="p-2">Normal</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Insignificante</td>
                          <td className="p-2">de 2 a 4</td>
                          <td className="p-2">
                            Geralmente sem tratamento (exceto se HH); follow up
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Leve</td>
                          <td className="p-2">entre 4 e 6</td>
                          <td className="p-2">
                            Tratamento depende do perfil do paciente
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Moderada</td>
                          <td className="p-2">entre 6 e 8</td>
                          <td className="p-2">
                            Geralmente tratada (exceto se causa hematológica)
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Moderada-grave</td>
                          <td className="p-2">entre 8 e 16</td>
                          <td className="p-2">
                            Comum apenas na HH e causas hematológicas
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">Grave</td>
                          <td className="p-2">&gt; 16</td>
                          <td className="p-2">Maior risco cardíaco</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
