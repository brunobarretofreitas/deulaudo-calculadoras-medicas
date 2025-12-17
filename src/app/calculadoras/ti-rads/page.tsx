"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackToCalculatorsButton } from "@/components/BackToCalculatorsButton";
import { ThyroidNoduleFlow } from "@/components/ti-rads/ThyroidNoduleFlow";
import { ResultCard } from "@/components/ti-rads/ResultCard";

export default function TIRads() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [hasAnswers, setHasAnswers] = useState<boolean>(false);

  const handlePointsChange = (points: number) => {
    setTotalPoints(points);
  };

  const handleHasAnswersChange = (hasAnswers: boolean) => {
    setHasAnswers(hasAnswers);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full max-w-7xl mx-auto py-8 px-8">
        <div className="mb-8">
          <BackToCalculatorsButton className="mb-4" />
          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Calculadora TI-RADS para Nódulos Tireoidianos
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Calculadora TI-RADS para avaliação de nódulos tireoidianos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna 1: Perguntas com scroll */}
          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Calculadora TI-RADS</CardTitle>
                <CardDescription>
                  Responda as perguntas abaixo para calcular o escore TI-RADS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ThyroidNoduleFlow 
                  onPointsChange={handlePointsChange}
                  onHasAnswersChange={handleHasAnswersChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Coluna 2: Resultado fixo */}
          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <div className="sticky top-8">
              {hasAnswers ? (
                <ResultCard totalPoints={totalPoints} />
              ) : (
                <Card className="border-2 border-dashed">
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      Responda as perguntas para ver o resultado
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

