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
import {
  calculateEFW,
  calculateEFWPercentile,
  calculateUAPIPercentile,
  calculateMCAPIPercentile,
  calculateCPR,
  calculateCPRPercentile,
  calculateClinicalFlags,
} from "@/lib/fetal-growth-calculations";
import { cn } from "@/lib/utils";

export default function CrescimentoFetalDoppler() {
  // Gestational age
  const [gaWeeks, setGaWeeks] = useState<string>("");
  const [gaDays, setGaDays] = useState<string>("");

  // Biometry (in mm)
  const [hc, setHc] = useState<string>("");
  const [ac, setAc] = useState<string>("");
  const [fl, setFl] = useState<string>("");

  // Doppler
  const [uaPi, setUaPi] = useState<string>("");
  const [mcaPi, setMcaPi] = useState<string>("");

  // Fetal sex (optional, for future use)
  const [fetalSex, setFetalSex] = useState<string>("");

  // Parse inputs
  const weeks = parseInt(gaWeeks) || 0;
  const days = parseInt(gaDays) || 0;
  const hcValue = parseFloat(hc) || 0;
  const acValue = parseFloat(ac) || 0;
  const flValue = parseFloat(fl) || 0;
  const uaPiValue = parseFloat(uaPi) || 0;
  const mcaPiValue = parseFloat(mcaPi) || 0;

  // Validate GA
  const isValidGA = weeks >= 20 && weeks <= 41 && days >= 0 && days <= 6;

  // Calculate EFW
  const efw = useMemo(() => {
    if (hcValue > 0 && acValue > 0 && flValue > 0) {
      return calculateEFW(hcValue, acValue, flValue);
    }
    return null;
  }, [hcValue, acValue, flValue]);

  // Calculate EFW percentile
  const efwPercentile = useMemo(() => {
    if (efw !== null && isValidGA) {
      return calculateEFWPercentile(efw, weeks, days);
    }
    return null;
  }, [efw, weeks, days, isValidGA]);

  // Calculate Doppler percentiles
  const uaPiPercentile = useMemo(() => {
    if (uaPiValue > 0 && isValidGA) {
      return calculateUAPIPercentile(uaPiValue, weeks, days);
    }
    return null;
  }, [uaPiValue, weeks, days, isValidGA]);

  const mcaPiPercentile = useMemo(() => {
    if (mcaPiValue > 0 && isValidGA) {
      return calculateMCAPIPercentile(mcaPiValue, weeks, days);
    }
    return null;
  }, [mcaPiValue, weeks, days, isValidGA]);

  // Calculate CPR
  const cpr = useMemo(() => {
    if (uaPiValue > 0 && mcaPiValue > 0) {
      return calculateCPR(mcaPiValue, uaPiValue);
    }
    return null;
  }, [uaPiValue, mcaPiValue]);

  const cprPercentile = useMemo(() => {
    if (cpr !== null && isValidGA) {
      return calculateCPRPercentile(cpr, weeks, days);
    }
    return null;
  }, [cpr, weeks, days, isValidGA]);

  // Calculate clinical flags
  const flags = useMemo(() => {
    return calculateClinicalFlags(
      efwPercentile,
      uaPiPercentile,
      mcaPiPercentile,
      cprPercentile
    );
  }, [efwPercentile, uaPiPercentile, mcaPiPercentile, cprPercentile]);

  // Check if we have any results to show
  const hasResults =
    efw !== null ||
    uaPiPercentile !== null ||
    mcaPiPercentile !== null ||
    cprPercentile !== null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-4xl flex-col py-16 px-8">
        <div className="w-full max-w-2xl space-y-6">
          <BackToCalculatorsButton className="mb-8" />

          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Calculadora de Crescimento Fetal + Doppler
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-12">
            Calculadora para avaliação de crescimento fetal e índices Doppler,
            baseada nas referências FMF/Barcelona.
          </p>

          {/* Formula Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Fórmula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-sm">Peso Fetal Estimado (EFW):</p>
                <p className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  Fórmula de Hadlock: log₁₀(EFW) = 1.326 - 0.00326×AC×FL + 0.0107×HC + 0.0438×AC + 0.158×FL
                </p>
                <p className="text-xs text-muted-foreground">
                  Onde HC, AC e FL são em centímetros
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-sm">CPR (Cerebroplacental Ratio):</p>
                <p className="text-sm text-muted-foreground font-mono bg-muted p-3 rounded">
                  CPR = MCA_PI / UA_PI
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Crescimento Fetal + Doppler</CardTitle>
              <CardDescription>
                Insira os valores de idade gestacional, biometria e Doppler para
                calcular os percentis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Gestational Age */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Idade Gestacional</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ga-weeks" className="text-base font-semibold">
                      Semanas (20-41):
                    </Label>
                    <Input
                      id="ga-weeks"
                      type="number"
                      min="20"
                      max="41"
                      value={gaWeeks}
                      onChange={(e) => setGaWeeks(e.target.value)}
                      placeholder="Ex: 30"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ga-days" className="text-base font-semibold">
                      Dias (0-6):
                    </Label>
                    <Input
                      id="ga-days"
                      type="number"
                      min="0"
                      max="6"
                      value={gaDays}
                      onChange={(e) => setGaDays(e.target.value)}
                      placeholder="Ex: 3"
                      className="w-full"
                    />
                  </div>
                </div>
                {!isValidGA && (gaWeeks !== "" || gaDays !== "") && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Idade gestacional deve estar entre 20-41 semanas e 0-6 dias.
                  </p>
                )}
              </div>

              {/* Biometry */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Biometria (mm)</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hc" className="text-base font-semibold">
                      HC (Cabeça):
                    </Label>
                    <Input
                      id="hc"
                      type="number"
                      step="0.1"
                      min="0"
                      value={hc}
                      onChange={(e) => setHc(e.target.value)}
                      placeholder="mm"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ac" className="text-base font-semibold">
                      AC (Abdômen):
                    </Label>
                    <Input
                      id="ac"
                      type="number"
                      step="0.1"
                      min="0"
                      value={ac}
                      onChange={(e) => setAc(e.target.value)}
                      placeholder="mm"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fl" className="text-base font-semibold">
                      FL (Fêmur):
                    </Label>
                    <Input
                      id="fl"
                      type="number"
                      step="0.1"
                      min="0"
                      value={fl}
                      onChange={(e) => setFl(e.target.value)}
                      placeholder="mm"
                      className="w-full"
                    />
                  </div>
                </div>
                {(hcValue <= 0 || acValue <= 0 || flValue <= 0) &&
                  (hc !== "" || ac !== "" || fl !== "") && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Todas as medidas de biometria devem ser maiores que zero.
                    </p>
                  )}
              </div>

              {/* Doppler */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Doppler</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ua-pi" className="text-base font-semibold">
                      UA-PI (Artéria Umbilical):
                    </Label>
                    <Input
                      id="ua-pi"
                      type="number"
                      step="0.01"
                      min="0"
                      value={uaPi}
                      onChange={(e) => setUaPi(e.target.value)}
                      placeholder="Ex: 1.20"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mca-pi" className="text-base font-semibold">
                      MCA-PI (Artéria Cerebral Média):
                    </Label>
                    <Input
                      id="mca-pi"
                      type="number"
                      step="0.01"
                      min="0"
                      value={mcaPi}
                      onChange={(e) => setMcaPi(e.target.value)}
                      placeholder="Ex: 1.50"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Optional: Fetal Sex */}
              <div className="space-y-2">
                <Label htmlFor="fetal-sex" className="text-base font-semibold">
                  Sexo Fetal (opcional):
                </Label>
                <select
                  id="fetal-sex"
                  value={fetalSex}
                  onChange={(e) => setFetalSex(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Não especificado</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </select>
              </div>

              {/* Results */}
              {hasResults && (
                <div className="space-y-4 mt-6 pt-6 border-t">
                  <h2 className="text-xl font-bold">Resultados</h2>

                  {/* EFW Results */}
                  {efw !== null && (
                    <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">
                              Peso Fetal Estimado (EFW)
                            </p>
                            <p className="text-3xl font-bold">
                              {efw.toLocaleString()} g
                            </p>
                          </div>
                          {efwPercentile !== null && (
                            <div className="text-center border-t border-gray-300 dark:border-gray-600 pt-3">
                              <p className="text-lg font-semibold">
                              Percentil: {efwPercentile.toFixed(1)}%
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Doppler Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uaPiPercentile !== null && (
                      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-center">
                              UA-PI
                            </p>
                            <p className="text-2xl font-bold text-center">
                              {uaPiValue.toFixed(2)}
                            </p>
                            <p className="text-sm text-center text-muted-foreground">
                              Percentil: {uaPiPercentile.toFixed(1)}%
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {mcaPiPercentile !== null && (
                      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-center">
                              MCA-PI
                            </p>
                            <p className="text-2xl font-bold text-center">
                              {mcaPiValue.toFixed(2)}
                            </p>
                            <p className="text-sm text-center text-muted-foreground">
                              Percentil: {mcaPiPercentile.toFixed(1)}%
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* CPR Results */}
                  {cpr !== null && cprPercentile !== null && (
                    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-center">
                            CPR (Cerebroplacental Ratio)
                          </p>
                          <p className="text-2xl font-bold text-center">
                            {cpr.toFixed(2)}
                          </p>
                          <p className="text-sm text-center text-muted-foreground">
                            Percentil: {cprPercentile.toFixed(1)}%
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Clinical Flags */}
                  {(flags.efw_p10 ||
                    flags.efw_p3 ||
                    flags.uaPi_high ||
                    flags.mcaPi_low ||
                    flags.cpr_low) && (
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700">
                      <CardHeader>
                        <CardTitle className="text-lg">Flags Clínicos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {flags.efw_p3 && (
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 dark:text-red-400 font-bold">
                                ⚠️
                              </span>
                              <span className="text-sm">
                                EFW abaixo do percentil 3
                              </span>
                            </div>
                          )}
                          {flags.efw_p10 && !flags.efw_p3 && (
                            <div className="flex items-center gap-2">
                              <span className="text-orange-600 dark:text-orange-400 font-bold">
                                ⚠️
                              </span>
                              <span className="text-sm">
                                EFW abaixo do percentil 10
                              </span>
                            </div>
                          )}
                          {flags.uaPi_high && (
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 dark:text-red-400 font-bold">
                                ⚠️
                              </span>
                              <span className="text-sm">
                                UA-PI acima do percentil 95
                              </span>
                            </div>
                          )}
                          {flags.mcaPi_low && (
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 dark:text-red-400 font-bold">
                                ⚠️
                              </span>
                              <span className="text-sm">
                                MCA-PI abaixo do percentil 5
                              </span>
                            </div>
                          )}
                          {flags.cpr_low && (
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 dark:text-red-400 font-bold">
                                ⚠️
                              </span>
                              <span className="text-sm">
                                CPR abaixo do percentil 5
                              </span>
                            </div>
                          )}
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

