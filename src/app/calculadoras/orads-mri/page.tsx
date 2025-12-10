"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResultCard } from "@/components/orads-mri/ResultCard";
import { BooleanQuestion } from "@/components/BooleanQuestion";
import { MultipleChoiceQuestion } from "@/components/MultipleChoiceQuestion";
import { BackToCalculatorsButton } from "@/components/BackToCalculatorsButton";

export default function ORadsMRI() {
  const [peritoneoResposta, setPeritoneoResposta] = useState<string>("");
  const [foliculoResposta, setFoliculoResposta] = useState<string>("");
  const [gorduraResposta, setGorduraResposta] = useState<string>("");
  const [tecidoSolidoResposta, setTecidoSolidoResposta] = useState<string>("");
  const [tecidoSolidoAnexialResposta, setTecidoSolidoAnexialResposta] = useState<string>("");
  const [tipoCistoResposta, setTipoCistoResposta] = useState<string>("");
  const [realceParedeResposta, setRealceParedeResposta] = useState<string>("");
  const [conteudoLiquidoResposta, setConteudoLiquidoResposta] = useState<string>("");
  const [intensidadeSinalResposta, setIntensidadeSinalResposta] = useState<string>("");
  const [realceTecidoSolidoResposta, setRealceTecidoSolidoResposta] = useState<string>("");

  // Calcular o score baseado nas respostas
  const score = useMemo(() => {
    // Se a primeira resposta for "sim", score é 5
    if (peritoneoResposta === "sim") {
      return 5;
    }
    // Se ainda não respondeu a primeira pergunta, não há score
    if (peritoneoResposta === "") {
      return null;
    }
    // Se respondeu "não" na primeira e "sim" na segunda, score é 1
    if (peritoneoResposta === "nao" && foliculoResposta === "sim") {
      return 1;
    }
    // Se respondeu "não" na primeira, "não" na segunda e "sim" na terceira (gordura)
    if (peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "sim") {
      // Se há tecido sólido com realce, score é 4
      if (tecidoSolidoResposta === "sim") {
        return 4;
      }
      // Se não há tecido sólido com realce, score é 2
      if (tecidoSolidoResposta === "nao") {
        return 2;
      }
      // Se ainda não respondeu a pergunta 3.1, não há score
      return null;
    }
    // Se respondeu "não" na primeira, "não" na segunda, "não" na terceira e "não" na quarta
    if (peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "nao") {
      // Se o tipo de cisto é unilocular
      if (tipoCistoResposta === "unilocular") {
        // Se não há realce da parede, score é 2
        if (realceParedeResposta === "nao") {
          return 2;
        }
        // Se há realce da parede, verifica o conteúdo líquido
        if (realceParedeResposta === "sim") {
          // Se o conteúdo líquido não é simples ou endometriótico, score é 3
          if (conteudoLiquidoResposta === "nao") {
            return 3;
          }
          // Se o conteúdo líquido é simples ou endometriótico, score é 2
          if (conteudoLiquidoResposta === "sim") {
            return 2;
          }
          // Se ainda não respondeu a pergunta do conteúdo líquido, não há score
          return null;
        }
        // Se ainda não respondeu a pergunta do realce da parede, não há score
        return null;
      }
      // Se o tipo de cisto é multilocular, score é 3
      if (tipoCistoResposta === "multilocular") {
        return 3;
      }
      // Se ainda não respondeu a pergunta do tipo de cisto, não há score
      return null;
    }
    // Se respondeu "não" na primeira, "não" na segunda, "não" na terceira e "sim" na quarta (tecido sólido anexial)
    if (peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "sim") {
      // Se a intensidade de sinal é "Todo o tecido sólido na lesão é homogêneo e de sinal escuro", score é 2
      if (intensidadeSinalResposta === "sinal-escuro") {
        return 2;
      }
      // Se a intensidade de sinal é "Parte ou todo o tecido sólido apresenta sinal intermediário ou alto"
      if (intensidadeSinalResposta === "sinal-intermediario-alto") {
        // Verifica o realce do tecido sólido
        // A ou D -> score 4
        if (realceTecidoSolidoResposta === "hipo-iso-realce" || realceTecidoSolidoResposta === "tic-risco-intermediario") {
          return 4;
        }
        // B ou E -> score 5
        if (realceTecidoSolidoResposta === "hiper-realce" || realceTecidoSolidoResposta === "tic-alto-risco") {
          return 5;
        }
        // C -> score 3
        if (realceTecidoSolidoResposta === "tic-baixo-risco") {
          return 3;
        }
        // Se ainda não respondeu a pergunta do realce do tecido sólido, não há score
        return null;
      }
      // Se ainda não respondeu a pergunta da intensidade de sinal, não há score
      return null;
    }
    // Se respondeu "não" na primeira, "não" na segunda e "não" na terceira, continua para próxima pergunta
    // Por enquanto retorna null até implementar mais lógica
    return null;
  }, [peritoneoResposta, foliculoResposta, gorduraResposta, tecidoSolidoResposta, tecidoSolidoAnexialResposta, tipoCistoResposta, realceParedeResposta, conteudoLiquidoResposta, intensidadeSinalResposta, realceTecidoSolidoResposta]);

  // Determinar se deve mostrar a segunda pergunta
  const mostrarSegundaPergunta = peritoneoResposta === "nao";
  
  // Determinar se deve mostrar a terceira pergunta
  const mostrarTerceiraPergunta = peritoneoResposta === "nao" && foliculoResposta === "nao";
  
  // Determinar se deve mostrar a pergunta 3.1 (tecido sólido) - quando gordura = sim
  const mostrarPerguntaTecidoSolido = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "sim";
  
  // Determinar se deve mostrar a pergunta 4 (tecido sólido anexial) - quando gordura = não
  const mostrarPerguntaQuatro = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao";
  
  // Determinar se deve mostrar a pergunta 4.1 (tipo de cisto) - quando pergunta 4 = não
  const mostrarPerguntaQuatroUm = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "nao";
  
  // Determinar se deve mostrar a pergunta sobre realce da parede - quando tipo de cisto = unilocular
  const mostrarPerguntaRealceParede = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "nao" && tipoCistoResposta === "unilocular";
  
  // Determinar se deve mostrar a pergunta sobre conteúdo líquido - quando realce da parede = sim
  const mostrarPerguntaConteudoLiquido = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "nao" && tipoCistoResposta === "unilocular" && realceParedeResposta === "sim";
  
  // Determinar se deve mostrar a pergunta 4.2 (intensidade de sinal) - quando pergunta 4 = sim
  const mostrarPerguntaQuatroDois = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "sim";
  
  // Determinar se deve mostrar a pergunta 4.2.1 (realce do tecido sólido) - quando pergunta 4.2 não for "sinal-escuro"
  const mostrarPerguntaQuatroDoisUm = peritoneoResposta === "nao" && foliculoResposta === "nao" && gorduraResposta === "nao" && tecidoSolidoAnexialResposta === "sim" && intensidadeSinalResposta === "sinal-intermediario-alto";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-4xl flex-col py-16 px-8">
        <div className="w-full max-w-2xl space-y-6">
          <BackToCalculatorsButton className="mb-8" />

          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            O-RADS MRI
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-12">
            Calculadora O-RADS MRI para avaliação de lesões ovarianas.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora O-RADS MRI</CardTitle>
              <CardDescription>
                Responda as perguntas abaixo para calcular o escore O-RADS MRI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <BooleanQuestion
                pergunta="Presença de nodularidade ou espessamento irregular do peritônio, mesentério ou omento, com ou sem ascite?"
                value={peritoneoResposta}
                onValueChange={setPeritoneoResposta}
                id="peritoneo"
              />

              {mostrarSegundaPergunta && (
                <BooleanQuestion
                  pergunta="A alteração anexial é um folículo, corpo lúteo ou cisto hemorrágico ≤ 3 cm em uma mulher pré-menopáusica?"
                  value={foliculoResposta}
                  onValueChange={setFoliculoResposta}
                  id="foliculo"
                  showBorder
                />
              )}

              {mostrarTerceiraPergunta && (
                <BooleanQuestion
                  pergunta="Há gordura associada à lesão?"
                  value={gorduraResposta}
                  onValueChange={setGorduraResposta}
                  id="gordura"
                  showBorder
                />
              )}

              {mostrarPerguntaTecidoSolido && (
                <BooleanQuestion
                  pergunta="Há uma grande quantidade de tecido sólido com realce?"
                  value={tecidoSolidoResposta}
                  onValueChange={setTecidoSolidoResposta}
                  id="tecido-solido"
                  showBorder
                />
              )}

              {mostrarPerguntaQuatro && (
                <BooleanQuestion
                  pergunta="Há tecido sólido com realce associado à lesão anexial?"
                  value={tecidoSolidoAnexialResposta}
                  onValueChange={setTecidoSolidoAnexialResposta}
                  id="tecido-solido-anexial"
                  showBorder
                />
              )}

              {mostrarPerguntaQuatroDois && (
                <MultipleChoiceQuestion
                  pergunta="O que melhor descreve a intensidade de sinal do tecido sólido em T2 e em imagens de difusão com alto valor B?"
                  value={intensidadeSinalResposta}
                  onValueChange={setIntensidadeSinalResposta}
                  id="intensidade-sinal"
                  opcoes={[
                    { 
                      value: "sinal-escuro", 
                      label: "Todo o tecido sólido na lesão é homogêneo e de sinal escuro.",
                      key: "sinal-escuro"
                    },
                    { 
                      value: "sinal-intermediario-alto", 
                      label: "Parte ou todo o tecido sólido apresenta sinal intermediário ou alto.",
                      key: "sinal-intermediario-alto"
                    },
                  ]}
                  showBorder
                />
              )}

              {mostrarPerguntaQuatroDoisUm && (
                <MultipleChoiceQuestion
                  pergunta="O que melhor descreve o realce do tecido sólido?"
                  value={realceTecidoSolidoResposta}
                  onValueChange={setRealceTecidoSolidoResposta}
                  id="realce-tecido-solido"
                  opcoes={[
                    { 
                      value: "hipo-iso-realce", 
                      label: "Hipo/iso-realce em relação ao miométrio aos 30–40 s na RM sem DCE.",
                      key: "a"
                    },
                    { 
                      value: "hiper-realce", 
                      label: "Hiper-realce em relação ao miométrio aos 30–40 s na RM sem DCE.",
                      key: "b"
                    },
                    { 
                      value: "tic-baixo-risco", 
                      label: "TIC de baixo risco na RM com DCE.",
                      key: "c"
                    },
                    { 
                      value: "tic-risco-intermediario", 
                      label: "TIC de risco intermediário na RM com DCE.",
                      key: "d"
                    },
                    { 
                      value: "tic-alto-risco", 
                      label: "TIC de alto risco na RM com DCE.",
                      key: "e"
                    },
                  ]}
                  showBorder
                />
              )}

              {mostrarPerguntaQuatroUm && (
                <MultipleChoiceQuestion
                  pergunta="Escolha o tipo de cisto"
                  value={tipoCistoResposta}
                  onValueChange={setTipoCistoResposta}
                  id="tipo-cisto"
                  opcoes={[
                    { value: "unilocular", label: "Unilocular" },
                    { value: "multilocular", label: "Multilocular" },
                  ]}
                  showBorder
                />
              )}

              {mostrarPerguntaRealceParede && (
                <BooleanQuestion
                  pergunta="Há realce da parede?"
                  value={realceParedeResposta}
                  onValueChange={setRealceParedeResposta}
                  id="realce-parede"
                  showBorder
                />
              )}

              {mostrarPerguntaConteudoLiquido && (
                <BooleanQuestion
                  pergunta="O conteúdo líquido é simples ou endometriótico?"
                  value={conteudoLiquidoResposta}
                  onValueChange={setConteudoLiquidoResposta}
                  id="conteudo-liquido"
                  showBorder
                />
              )}
            </CardContent>
          </Card>

          {score !== null && (
            <ResultCard score={score} />
          )}
        </div>
      </main>
    </div>
  );
}
