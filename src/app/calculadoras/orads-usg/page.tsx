"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResultCard } from "@/components/orads-usg/ResultCard";
import { BackToCalculatorsButton } from "@/components/BackToCalculatorsButton";
import { MultipleChoiceQuestion } from "@/components/MultipleChoiceQuestion";
import { BooleanQuestion } from "@/components/BooleanQuestion";
import { OvarianLesionFlow } from "@/components/orads-usg/OvarianLesionFlow";
import { ExtraOvarianLesionFlow } from "@/components/orads-usg/ExtraOvarianLesionFlow";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ORadsUSG() {
  const [lesaoOvarianaResposta, setLesaoOvarianaResposta] = useState<string>("");
  const [localizacaoResposta, setLocalizacaoResposta] = useState<string>("");
  const [lesaoExtraOvarianaResposta, setLesaoExtraOvarianaResposta] = useState<string>("");
  const [tipoLesaoOutra, setTipoLesaoOutra] = useState<string>("");
  const [componentesSolidos, setComponentesSolidos] = useState<string>("");
  const [morfologiaLesao, setMorfologiaLesao] = useState<string>("");
  const [numeroPps, setNumeroPps] = useState<string>("");
  const [componenteSolidoNaoPp, setComponenteSolidoNaoPp] = useState<string>("");
  const [complexidadeSepto, setComplexidadeSepto] = useState<string>("");
  const [margensLesao, setMargensLesao] = useState<string>("");
  const [morfologiaLesaoSemSolidos, setMorfologiaLesaoSemSolidos] = useState<string>("");
  const [morfologiaLesaoMargensLisas, setMorfologiaLesaoMargensLisas] = useState<string>("");
  const [continuarGuidelines, setContinuarGuidelines] = useState<string>("");
  const [managementGuidelines, setManagementGuidelines] = useState<string>("");
  const [tamanhoGuidelines, setTamanhoGuidelines] = useState<string>("");
  const [statusMenopausaGuidelines, setStatusMenopausaGuidelines] = useState<string>("");
  const [tamanhoSimpleCyst, setTamanhoSimpleCyst] = useState<string>("");
  const [statusMenopausaSimpleCyst, setStatusMenopausaSimpleCyst] = useState<string>("");
  const [lesaoExtraOvarianaGuidelines, setLesaoExtraOvarianaGuidelines] = useState<string>("");
  const [margensSolidLesion, setMargensSolidLesion] = useState<string>("");
  const [colorScore, setColorScore] = useState<string>("");
  const [shadowing, setShadowing] = useState<string>("");

  // Opções principais
  const opcoesPrincipais = [
    {
      value: "normal-ovary",
      label: "Ovário Normal",
      itens: [
        "Cisto fisiológico",
        "Folículo",
        "Corpo Lúteo",
      ],
    },
    {
      value: "classic-benign",
      label: "Lesão Benigna Clássica",
      itens: [
        "Para quaisquer características atípicas, use outros descritores do léxico",
      ],
    },
    {
      value: "other-lesion",
      label: "Outra lesão",
      itens: [],
    },
  ];

  // Determinar se deve mostrar a pergunta de localização
  const mostrarPerguntaLocalizacao = lesaoOvarianaResposta === "classic-benign";

  // Determinar se deve mostrar a pergunta de lesão extra-ovariana
  const mostrarPerguntaLesaoExtraOvariana = lesaoOvarianaResposta === "classic-benign" && localizacaoResposta === "extra-ovarian";

  // Determinar se deve mostrar a pergunta de lesão ovariana (2.1)
  const mostrarPerguntaLesaoOvariana = lesaoOvarianaResposta === "classic-benign" && localizacaoResposta === "ovarian";

  // Determinar se deve mostrar a pergunta de tipo de lesão (para "Other lesion")
  const mostrarPerguntaTipoLesao = lesaoOvarianaResposta === "other-lesion";

  // Determinar se deve mostrar a pergunta de componentes sólidos
  const mostrarPerguntaComponentesSolidos = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "cystic";

  // Determinar se deve mostrar o fluxo de morfologia (quando há componentes sólidos)
  const mostrarFluxoMorfologia = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "cystic" && 
    componentesSolidos === "sim";

  // Determinar se deve mostrar a pergunta de margens (quando não há componentes sólidos)
  const mostrarPerguntaMargens = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "cystic" && 
    componentesSolidos === "nao";

  // Determinar se deve mostrar o fluxo de morfologia quando margens são irregulares
  const mostrarFluxoMorfologiaMargensIrregulares = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "cystic" && 
    componentesSolidos === "nao" &&
    margensLesao === "irregular";

  // Determinar se deve mostrar a pergunta de morfologia quando margens são lisas
  const mostrarPerguntaMorfologiaMargensLisas = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "cystic" && 
    componentesSolidos === "nao" &&
    margensLesao === "smooth";

  // Determinar se deve mostrar a pergunta de continuar guidelines (quando Uni- ou bilocular <10 cm)
  const mostrarPerguntaContinuarGuidelines = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "cystic" && 
    componentesSolidos === "nao" &&
    margensLesao === "smooth" &&
    morfologiaLesaoMargensLisas === "uni-bilocular-menor-10cm";

  // Determinar se deve mostrar a pergunta de Management Guidelines
  const mostrarPerguntaManagementGuidelines = mostrarPerguntaContinuarGuidelines && 
    continuarGuidelines === "sim";

  // Determinar se deve mostrar o fluxo de tamanho (para Unilocular smooth non-simple ou Bilocular smooth)
  const mostrarFluxoTamanhoGuidelines = mostrarPerguntaManagementGuidelines && 
    (managementGuidelines === "unilocular-smooth-non-simple" || 
     managementGuidelines === "bilocular-smooth");

  // Determinar se deve mostrar a pergunta de status menopausa (quando tamanho < 3cm)
  const mostrarPerguntaStatusMenopausaGuidelines = mostrarFluxoTamanhoGuidelines && 
    tamanhoGuidelines === "menor-3cm";

  // Determinar se deve mostrar o fluxo de tamanho para Simple cyst
  const mostrarFluxoTamanhoSimpleCyst = mostrarPerguntaManagementGuidelines && 
    managementGuidelines === "simple-cyst";

  // Determinar se deve mostrar a pergunta de status menopausa para Simple cyst
  const mostrarPerguntaStatusMenopausaSimpleCyst = mostrarFluxoTamanhoSimpleCyst && 
    tamanhoSimpleCyst !== "";

  // Determinar se deve mostrar a pergunta de Extra-Ovarian Lesion (quando Typical benign extraovarian lesion é selecionada)
  const mostrarPerguntaExtraOvarianGuidelines = mostrarPerguntaManagementGuidelines && 
    managementGuidelines === "typical-benign-extraovarian";

  // Determinar se deve mostrar o OvarianLesionFlow (quando Typical benign ovarian lesion é selecionada)
  const mostrarOvarianLesionGuidelines = mostrarPerguntaManagementGuidelines && 
    managementGuidelines === "typical-benign-ovarian";

  // Determinar se deve mostrar perguntas para Uniocular
  const mostrarPerguntasUniocular = mostrarFluxoMorfologia && morfologiaLesao === "uniocular";

  // Determinar se deve mostrar perguntas para Bi/Multilocular
  const mostrarPerguntasBiMultilocular = mostrarFluxoMorfologia && 
    (morfologiaLesao === "binocular" || morfologiaLesao === "multilocular");

  // Determinar se deve mostrar o fluxo de lesão sólida
  const mostrarFluxoSolidLesion = lesaoOvarianaResposta === "other-lesion" && 
    tipoLesaoOutra === "solid";

  // Determinar se deve mostrar a pergunta de margens para lesão sólida
  const mostrarPerguntaMargensSolid = mostrarFluxoSolidLesion;

  // Determinar se deve mostrar a pergunta de Color Score (quando margens são smooth)
  const mostrarPerguntaColorScore = mostrarPerguntaMargensSolid && 
    margensSolidLesion === "smooth";

  // Resetar localização quando a opção principal mudar
  const handleLesaoOvarianaChange = (value: string) => {
    setLesaoOvarianaResposta(value);
    if (value !== "classic-benign") {
      setLocalizacaoResposta("");
      setLesaoExtraOvarianaResposta("");
    }
    if (value !== "other-lesion") {
      setTipoLesaoOutra("");
      setComponentesSolidos("");
      setMorfologiaLesao("");
      setNumeroPps("");
      setComponenteSolidoNaoPp("");
      setComplexidadeSepto("");
      setMargensLesao("");
      setMorfologiaLesaoSemSolidos("");
      setMorfologiaLesaoMargensLisas("");
      setContinuarGuidelines("");
      setManagementGuidelines("");
      setTamanhoGuidelines("");
      setStatusMenopausaGuidelines("");
      setTamanhoSimpleCyst("");
      setStatusMenopausaSimpleCyst("");
      setLesaoExtraOvarianaGuidelines("");
    }
  };

  // Resetar lesão extra-ovariana quando a localização mudar
  const handleLocalizacaoChange = (value: string) => {
    setLocalizacaoResposta(value);
    if (value !== "extra-ovarian") {
      setLesaoExtraOvarianaResposta("");
    }
  };

  // Calcular o score baseado nas respostas
  const score = useMemo(() => {
    // Se a resposta for "Ovário Normal", score é 1
    if (lesaoOvarianaResposta === "normal-ovary") {
      return 1;
    }

    if (!!lesaoExtraOvarianaResposta) {
      return 2;
    }

    // Se a resposta do extra ovariana veio do fluxo secundario, avalia a respota
    if (!!lesaoExtraOvarianaResposta) {
      return 2;
    }

    // Nota: Os scores dos componentes OvarianLesionFlow e ExtraOvarianLesionFlow
    // são gerenciados internamente pelos próprios componentes e exibidos diretamente neles.
    // Não precisamos calcular esses scores aqui.
    // Se a resposta for "Other lesion" com componentes sólidos
    // O-RADS Score 4: Uni-locular (<4 pps) OR (solid component that is not a pp)
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "sim" &&
        morfologiaLesao === "uniocular") {
      if (numeroPps === "menor-4" || componenteSolidoNaoPp === "sim") {
        return 4;
      }
      // O-RADS Score 5: Uni-locular (≥4 pps)
      if (numeroPps === "maior-igual-4") {
        return 5;
      }
      return null;
    }
    // O-RADS Score 4: Bi- or Multilocular (CS 1-2)
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "sim" &&
        (morfologiaLesao === "binocular" || morfologiaLesao === "multilocular") &&
        complexidadeSepto === "cs-1-2") {
      return 4;
    }
    // O-RADS Score 5: Bi- or Multilocular (CS 3-4)
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "sim" &&
        (morfologiaLesao === "binocular" || morfologiaLesao === "multilocular") &&
        complexidadeSepto === "cs-3-4") {
      return 5;
    }
    // Se a resposta for "Other lesion" sem componentes sólidos e margens irregulares
    // O-RADS Score 3: Uni-locular
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "nao" &&
        margensLesao === "irregular" &&
        morfologiaLesaoSemSolidos === "uniocular") {
      return 3;
    }
    // O-RADS Score 4: Bi- or Multilocular
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "nao" &&
        margensLesao === "irregular" &&
        (morfologiaLesaoSemSolidos === "binocular" || morfologiaLesaoSemSolidos === "multilocular")) {
      return 4;
    }
    // Se a resposta for "Other lesion" sem componentes sólidos, margens lisas
    // O-RADS Score 3: Uni- ou bilocular (≥10 cm) OU Multilocular (CS <4) (<10 cm)
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "nao" &&
        margensLesao === "smooth" &&
        (morfologiaLesaoMargensLisas === "uni-bilocular-maior-igual-10cm" ||
         morfologiaLesaoMargensLisas === "multilocular-cs-menor-4-menor-10cm")) {
      return 3;
    }
    // O-RADS Score 4: Multilocular (CS <4) (≥10 cm) OU Multilocular (CS 4)
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "nao" &&
        margensLesao === "smooth" &&
        (morfologiaLesaoMargensLisas === "multilocular-cs-menor-4-maior-igual-10cm" ||
         morfologiaLesaoMargensLisas === "multilocular-cs-4")) {
      return 4;
    }
    // O-RADS Score 2: Uni- ou bilocular (<10 cm) - mas não se for typical-benign-extraovarian
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "cystic" && 
        componentesSolidos === "nao" &&
        margensLesao === "smooth" &&
        morfologiaLesaoMargensLisas === "uni-bilocular-menor-10cm" &&
        managementGuidelines !== "typical-benign-extraovarian") {
      return 2;
    }
    // Se a resposta for "Other lesion" e tipo for "Solid/Solid-appearing Lesion"
    // O-RADS Score 5: Margens irregulares OU (Margens lisas e CS 4 + shadowing)
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "solid" &&
        (margensSolidLesion === "irregular" ||
         (margensSolidLesion === "smooth" && colorScore === "cs-4" && shadowing === "sim"))) {
      return 5;
    }
    // O-RADS Score 3: Margens lisas e (CS < 4 ou CS 1 ou shadowing) - mas não se for CS 4 + shadowing
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "solid" &&
        margensSolidLesion === "smooth" &&
        !(colorScore === "cs-4" && shadowing === "sim") &&
        (colorScore === "cs-menor-4" || 
         colorScore === "cs-1" || 
         (shadowing === "sim" && colorScore !== "cs-4"))) {
      return 3;
    }
    // O-RADS Score 4: Margens lisas e CS 2-3 OU CS 4 sem shadowing
    if (lesaoOvarianaResposta === "other-lesion" && 
        tipoLesaoOutra === "solid" &&
        margensSolidLesion === "smooth" &&
        ((colorScore === "cs-2" || colorScore === "cs-3") ||
         (colorScore === "cs-4" && shadowing !== "sim"))) {
      return 4;
    }
    // Se ainda não respondeu, não há score
    if (lesaoOvarianaResposta === "") {
      return null;
    }
    // Para outras opções, ainda não implementado
    return null;
  }, [lesaoOvarianaResposta, localizacaoResposta, lesaoExtraOvarianaResposta, tipoLesaoOutra, componentesSolidos, morfologiaLesao, numeroPps, componenteSolidoNaoPp, complexidadeSepto, margensLesao, morfologiaLesaoSemSolidos, morfologiaLesaoMargensLisas, continuarGuidelines, managementGuidelines, margensSolidLesion, colorScore, shadowing]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex min-h-screen w-full max-w-4xl flex-col py-16 px-8">
        <div className="w-full max-w-2xl space-y-6">
          <BackToCalculatorsButton className="mb-8" />

          <h1 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            O-RADS USG
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-12">
            Calculadora O-RADS USG para avaliação de lesões ovarianas.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Calculadora O-RADS USG</CardTitle>
              <CardDescription>
                Responda as perguntas abaixo para calcular o escore O-RADS USG.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pergunta 1: Lesões ovarianas */}
              <div className="flex flex-col gap-4">
                <Label className="text-base font-semibold">Lesões ovarianas</Label>
                
                {/* Opções principais */}
                <RadioGroupPrimitive.Root
                  value={lesaoOvarianaResposta}
                  onValueChange={handleLesaoOvarianaChange}
                  className="flex flex-col gap-3"
                >
                  {opcoesPrincipais.map((opcao) => {
                    const isSelected = lesaoOvarianaResposta === opcao.value;
                    
                    return (
                      <RadioGroupPrimitive.Item
                        key={opcao.value}
                        value={opcao.value}
                        id={`lesao-ovariana-${opcao.value}`}
                        className={cn(
                          "w-full cursor-pointer rounded-lg border-2 p-4 transition-all text-left",
                          "hover:bg-accent hover:border-primary/50",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-input bg-background"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground bg-background"
                            )}
                          >
                            {isSelected && (
                              <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span
                              className={cn(
                                "font-normal text-sm leading-relaxed block",
                                isSelected ? "text-primary font-medium" : "text-foreground"
                              )}
                            >
                              {opcao.label}
                            </span>
                            {opcao.itens && opcao.itens.length > 0 && (
                              <ul className="mt-2 ml-4 space-y-1 list-none">
                                {opcao.itens.map((item, index) => (
                                  <li
                                    key={index}
                                    className={cn(
                                      "text-xs leading-relaxed",
                                      isSelected ? "text-primary/80" : "text-muted-foreground"
                                    )}
                                  >
                                    <span className="mr-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </RadioGroupPrimitive.Item>
                    );
                  })}
                </RadioGroupPrimitive.Root>
              </div>

              {/* Pergunta 2: Localização - aparece quando "Lesão Benigna Clássica" é selecionada */}
              {mostrarPerguntaLocalizacao && (
                <MultipleChoiceQuestion
                  pergunta="Localização"
                  value={localizacaoResposta}
                  onValueChange={handleLocalizacaoChange}
                  id="localizacao"
                  opcoes={[
                    { value: "extra-ovarian", label: "Extra-Ovariano" },
                    { value: "ovarian", label: "Ovariano" },
                  ]}
                  showBorder
                />
              )}

              {/* Pergunta 2.1: Lesão Ovariana - aparece quando localização é "Ovariano" */}
              {mostrarPerguntaLesaoOvariana && (
                <OvarianLesionFlow />
              )}

              {/* Pergunta de tipo de lesão (para "Other lesion") */}
              {mostrarPerguntaTipoLesao && (
                <MultipleChoiceQuestion
                  pergunta="A lesão é Cística ou Sólida?"
                  value={tipoLesaoOutra}
                  onValueChange={(value) => {
                    setTipoLesaoOutra(value);
                    if (value !== "cystic") {
                      setComponentesSolidos("");
                    }
                    if (value !== "solid") {
                      setMargensSolidLesion("");
                      setColorScore("");
                      setShadowing("");
                    }
                  }}
                  id="tipo-lesao-outra"
                  opcoes={[
                    { value: "cystic", label: "Lesão Cística" },
                    { value: "solid", label: "Lesão Sólida/Lesão de Aparência Sólida" },
                  ]}
                  showBorder
                />
              )}

              {/* Fluxo de Lesão Sólida - Pergunta sobre margens */}
              {mostrarPerguntaMargensSolid && (
                <MultipleChoiceQuestion
                  pergunta="Como estão as margens?"
                  value={margensSolidLesion}
                  onValueChange={(value) => {
                    setMargensSolidLesion(value);
                    if (value !== "smooth") {
                      setColorScore("");
                      setShadowing("");
                    }
                  }}
                  id="margens-solid-lesion"
                  opcoes={[
                    { value: "smooth", label: "Lisas" },
                    { value: "irregular", label: "Irregulares" },
                  ]}
                  showBorder
                />
              )}

              {/* Fluxo de Lesão Sólida - Pergunta sobre Color Score (quando margens são smooth) */}
              {mostrarPerguntaColorScore && (
                <>
                  <MultipleChoiceQuestion
                    pergunta="Qual é o Color Score (CS)?"
                    value={colorScore}
                    onValueChange={setColorScore}
                    id="color-score"
                    opcoes={[
                      { value: "cs-1", label: "CS 1" },
                      { value: "cs-2", label: "CS 2" },
                      { value: "cs-3", label: "CS 3" },
                      { value: "cs-4", label: "CS 4" },
                      { value: "cs-menor-4", label: "CS < 4" },
                    ]}
                    showBorder
                  />
                  <BooleanQuestion
                    pergunta="Há shadowing?"
                    value={shadowing}
                    onValueChange={setShadowing}
                    id="shadowing"
                    showBorder
                  />
                </>
              )}

              {/* Pergunta de componentes sólidos (para lesão cística) */}
              {mostrarPerguntaComponentesSolidos && (
                <BooleanQuestion
                  pergunta="Há componentes sólidos?"
                  value={componentesSolidos}
                  onValueChange={(value) => {
                    setComponentesSolidos(value);
                    if (value !== "sim") {
                      setMorfologiaLesao("");
                      setNumeroPps("");
                      setComponenteSolidoNaoPp("");
                      setComplexidadeSepto("");
                      setMargensLesao("");
                    }
                    if (value !== "nao") {
                      setMargensLesao("");
                    }
                  }}
                  id="componentes-solidos"
                  showBorder
                />
              )}

              {/* Pergunta de margens (quando não há componentes sólidos) */}
              {mostrarPerguntaMargens && (
                <MultipleChoiceQuestion
                  pergunta="Como estão as margens?"
                  value={margensLesao}
                  onValueChange={(value) => {
                    setMargensLesao(value);
                    if (value !== "irregular") {
                      setMorfologiaLesaoSemSolidos("");
                    }
                    if (value !== "smooth") {
                      setMorfologiaLesaoMargensLisas("");
                    }
                  }}
                  id="margens-lesao"
                  opcoes={[
                    { value: "smooth", label: "Lisas" },
                    { value: "irregular", label: "Irregulares" },
                  ]}
                  showBorder
                />
              )}

              {/* Pergunta de morfologia quando margens são lisas */}
              {mostrarPerguntaMorfologiaMargensLisas && (
                <MultipleChoiceQuestion
                  pergunta="É Uniocular, Binocular ou Multilocular?"
                  value={morfologiaLesaoMargensLisas}
                  onValueChange={(value) => {
                    setMorfologiaLesaoMargensLisas(value);
                    if (value !== "uni-bilocular-menor-10cm") {
                      setContinuarGuidelines("");
                      setManagementGuidelines("");
                    }
                  }}
                  id="morfologia-lesao-margens-lisas"
                  opcoes={[
                    { value: "uni-bilocular-menor-10cm", label: "Uni- ou bilocular (<10 cm)" },
                    { value: "uni-bilocular-maior-igual-10cm", label: "Uni- ou bilocular (≥10 cm)" },
                    { value: "multilocular-cs-menor-4-menor-10cm", label: "Multilocular (CS <4) (<10 cm)" },
                    { value: "multilocular-cs-menor-4-maior-igual-10cm", label: "Multilocular (CS <4) (≥10 cm)" },
                    { value: "multilocular-cs-4", label: "Multilocular (CS 4)" },
                  ]}
                  showBorder
                />
              )}

              {/* Fluxo de morfologia quando margens são irregulares */}
              {mostrarFluxoMorfologiaMargensIrregulares && (
                <MultipleChoiceQuestion
                  pergunta="É Uniocular, Binocular ou Multilocular?"
                  value={morfologiaLesaoSemSolidos}
                  onValueChange={setMorfologiaLesaoSemSolidos}
                  id="morfologia-lesao-sem-solidos"
                  opcoes={[
                    { value: "uniocular", label: "Uniocular" },
                    { value: "binocular", label: "Binocular" },
                    { value: "multilocular", label: "Multilocular" },
                  ]}
                  showBorder
                />
              )}

              {/* Fluxo de morfologia quando há componentes sólidos */}
              {mostrarFluxoMorfologia && (
                <MultipleChoiceQuestion
                  pergunta="É Uniocular, Binocular ou Multilocular?"
                  value={morfologiaLesao}
                  onValueChange={(value) => {
                    setMorfologiaLesao(value);
                    setNumeroPps("");
                    setComponenteSolidoNaoPp("");
                    setComplexidadeSepto("");
                  }}
                  id="morfologia-lesao"
                  opcoes={[
                    { value: "uniocular", label: "Uniocular" },
                    { value: "binocular", label: "Binocular" },
                    { value: "multilocular", label: "Multilocular" },
                  ]}
                  showBorder
                />
              )}

              {/* Perguntas para Uniocular */}
              {mostrarPerguntasUniocular && (
                <>
                  <MultipleChoiceQuestion
                    pergunta="Quantos pps (papilas projetantes)?"
                    value={numeroPps}
                    onValueChange={setNumeroPps}
                    id="numero-pps"
                    opcoes={[
                      { value: "menor-4", label: "< 4 pps" },
                      { value: "maior-igual-4", label: "≥ 4 pps" },
                    ]}
                    showBorder
                  />
                  <BooleanQuestion
                    pergunta="Há componente sólido que não é uma pp (papila projetante)?"
                    value={componenteSolidoNaoPp}
                    onValueChange={setComponenteSolidoNaoPp}
                    id="componente-solido-nao-pp"
                    showBorder
                  />
                </>
              )}

              {/* Perguntas para Bi/Multilocular */}
              {mostrarPerguntasBiMultilocular && (
                <MultipleChoiceQuestion
                  pergunta="Qual é a complexidade do septo (CS)?"
                  value={complexidadeSepto}
                  onValueChange={setComplexidadeSepto}
                  id="complexidade-septo"
                  opcoes={[
                    { value: "cs-1-2", label: "CS 1-2" },
                    { value: "cs-3-4", label: "CS 3-4" },
                  ]}
                  showBorder
                />
              )}

              {/* Pergunta 3: Lesão Extra-Ovariana - aparece quando localização é "Extra-Ovariano" */}
              {mostrarPerguntaLesaoExtraOvariana && (
                <div className="flex flex-col gap-4 pt-4 border-t">
                  <ExtraOvarianLesionFlow
                    value={lesaoExtraOvarianaResposta}
                    onValueChange={setLesaoExtraOvarianaResposta}
                    idPrefix="lesao-extra-ovariana"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {score !== null && (
            <ResultCard score={score} />
          )}

          {/* Recomendações para O-RADS 3 (Lesão Sólida - Margens lisas e CS < 4 ou CS 1 ou shadowing) */}
          {score === 3 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "solid" &&
           margensSolidLesion === "smooth" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem:
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Se não for excisado cirurgicamente, considerar acompanhamento por US em até 6 meses</li>
                      <li>Se sólido, pode considerar especialista em US (se disponível) ou RM (com escore O-RADS MRI)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 4 (Lesão Sólida - Margens lisas e CS 2-3) */}
          {score === 4 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "solid" &&
           margensSolidLesion === "smooth" &&
           (colorScore === "cs-2" || colorScore === "cs-3") && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem (Opções incluem):
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Especialista em US (se disponível) -ou</li>
                      <li>RM (com escore O-RADS MRI) -ou</li>
                      <li>Conforme protocolo do ginecologista-oncologista</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista com consulta de ginecologista-oncologista ou exclusivamente por ginecologista-oncologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 5 (Lesão Sólida - Margens irregulares OU CS 4 + shadowing) */}
          {score === 5 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "solid" &&
           (margensSolidLesion === "irregular" ||
            (margensSolidLesion === "smooth" && colorScore === "cs-4" && shadowing === "sim")) && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Conforme protocolo do ginecologista-oncologista
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista-oncologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pergunta de continuar guidelines - aparece após score 2 para Uni- ou bilocular <10 cm */}
          {mostrarPerguntaContinuarGuidelines && (
            <Card>
              <CardContent className="pt-6">
                <BooleanQuestion
                  pergunta="Diretrizes de Gerenciamento Adicional! Continuar?"
                  value={continuarGuidelines}
                  onValueChange={(value) => {
                    setContinuarGuidelines(value);
                    if (value !== "sim") {
                      setManagementGuidelines("");
                    }
                  }}
                  id="continuar-guidelines"
                />
              </CardContent>
            </Card>
          )}

          {/* Pergunta de Management Guidelines */}
          {mostrarPerguntaManagementGuidelines && (
            <Card>
              <CardContent className="pt-6">
                <MultipleChoiceQuestion
                  pergunta="Diretrizes de Gerenciamento"
                  value={managementGuidelines}
                  onValueChange={(value) => {
                    setManagementGuidelines(value);
                    if (value !== "unilocular-smooth-non-simple" && value !== "bilocular-smooth") {
                      setTamanhoGuidelines("");
                      setStatusMenopausaGuidelines("");
                    }
                    if (value !== "simple-cyst") {
                      setTamanhoSimpleCyst("");
                      setStatusMenopausaSimpleCyst("");
                    }
                    if (value !== "typical-benign-extraovarian") {
                      setLesaoExtraOvarianaGuidelines("");
                    }
                  }}
                  id="management-guidelines"
                  opcoes={[
                    { value: "typical-benign-ovarian", label: "Lesão ovariana benigna típica (ver tabela \"Lesões Benignas Clássicas\") [<10 cm]" },
                    { value: "typical-benign-extraovarian", label: "Lesão extra-ovariana benigna típica (ver tabela \"Lesões Benignas Clássicas\") [Qualquer Tamanho]" },
                    { value: "simple-cyst", label: "Cisto simples" },
                    { value: "unilocular-smooth-non-simple", label: "Unilocular, liso, cisto não simples (ecos internos e/ou septações incompletas)" },
                    { value: "bilocular-smooth", label: "Bilocular, cisto liso" },
                  ]}
                />
              </CardContent>
            </Card>
          )}

          {/* Pergunta de Extra-Ovarian Lesion (quando Typical benign extraovarian lesion é selecionada) */}
          {mostrarPerguntaExtraOvarianGuidelines && (
            <Card>
              <CardContent className="pt-6">
                <ExtraOvarianLesionFlow
                  value={lesaoExtraOvarianaGuidelines}
                  onValueChange={setLesaoExtraOvarianaGuidelines}
                  idPrefix="lesao-extra-ovariana-guidelines"
                />
              </CardContent>
            </Card>
          )}

          {/* OvarianLesionFlow (quando Typical benign ovarian lesion é selecionada) */}
          {mostrarOvarianLesionGuidelines && (
            <Card>
              <CardContent className="pt-6">
                <OvarianLesionFlow />
              </CardContent>
            </Card>
          )}

          {/* Pergunta de tamanho (para Unilocular smooth non-simple ou Bilocular smooth) */}
          {mostrarFluxoTamanhoGuidelines && (
            <Card>
              <CardContent className="pt-6">
                <MultipleChoiceQuestion
                  pergunta="Qual é o tamanho?"
                  value={tamanhoGuidelines}
                  onValueChange={(value) => {
                    setTamanhoGuidelines(value);
                    if (value !== "menor-3cm") {
                      setStatusMenopausaGuidelines("");
                    }
                  }}
                  id="tamanho-guidelines"
                  opcoes={[
                    { value: "menor-3cm", label: "< 3cm" },
                    { value: "maior-3cm-menor-10cm", label: "> 3 cm mas < 10 cm" },
                  ]}
                />
              </CardContent>
            </Card>
          )}

          {/* Pergunta de status menopausa (quando tamanho < 3cm) */}
          {mostrarPerguntaStatusMenopausaGuidelines && (
            <Card>
              <CardContent className="pt-6">
                <MultipleChoiceQuestion
                  pergunta="Status Menopáusico?"
                  value={statusMenopausaGuidelines}
                  onValueChange={setStatusMenopausaGuidelines}
                  id="status-menopausa-guidelines"
                  opcoes={[
                    { value: "premenopausal", label: "Pré-menopausa" },
                    { value: "postmenopausal", label: "Pós-menopausa" },
                  ]}
                />
              </CardContent>
            </Card>
          )}

          {/* Pergunta de tamanho para Simple cyst */}
          {mostrarFluxoTamanhoSimpleCyst && (
            <Card>
              <CardContent className="pt-6">
                <MultipleChoiceQuestion
                  pergunta="Qual é o tamanho?"
                  value={tamanhoSimpleCyst}
                  onValueChange={(value) => {
                    setTamanhoSimpleCyst(value);
                    setStatusMenopausaSimpleCyst("");
                  }}
                  id="tamanho-simple-cyst"
                  opcoes={[
                    { value: "menor-3cm", label: "< 3cm" },
                    { value: "maior-3cm-ate-5cm", label: "> 3 cm até 5 cm" },
                    { value: "maior-5cm-menor-10cm", label: "> 5 cm mas < 10 cm" },
                  ]}
                />
              </CardContent>
            </Card>
          )}

          {/* Pergunta de status menopausa para Simple cyst */}
          {mostrarPerguntaStatusMenopausaSimpleCyst && (
            <Card>
              <CardContent className="pt-6">
                <MultipleChoiceQuestion
                  pergunta="Status Menopáusico?"
                  value={statusMenopausaSimpleCyst}
                  onValueChange={setStatusMenopausaSimpleCyst}
                  id="status-menopausa-simple-cyst"
                  opcoes={[
                    { value: "premenopausal", label: "Pré-menopausa" },
                    { value: "postmenopausal", label: "Pós-menopausa" },
                  ]}
                />
              </CardContent>
            </Card>
          )}


          {/* Recomendações para O-RADS 4 (Other lesion com componentes sólidos) */}
          {score === 4 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "cystic" && 
           componentesSolidos === "sim" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem (Opções incluem):
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Especialista em US (se disponível) -ou</li>
                      <li>RM (com escore O-RADS MRI) -ou</li>
                      <li>Conforme protocolo do ginecologista-oncologista</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista com consulta de ginecologista-oncologista ou exclusivamente por ginecologista-oncologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 5 (Other lesion com componentes sólidos) */}
          {score === 5 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "cystic" && 
           componentesSolidos === "sim" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Conforme protocolo do ginecologista-oncologista
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista-oncologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 3 (Other lesion sem componentes sólidos, margens irregulares, Uniocular) */}
          {score === 3 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "cystic" && 
           componentesSolidos === "nao" &&
           margensLesao === "irregular" &&
           morfologiaLesaoSemSolidos === "uniocular" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem:
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Se não for excisado cirurgicamente, considerar acompanhamento por US em até 6 meses</li>
                      <li>Se sólido, pode considerar especialista em US (se disponível) ou RM (com escore O-RADS MRI)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 4 (Other lesion sem componentes sólidos, margens irregulares, Bi/Multilocular) */}
          {score === 4 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "cystic" && 
           componentesSolidos === "nao" &&
           margensLesao === "irregular" &&
           (morfologiaLesaoSemSolidos === "binocular" || morfologiaLesaoSemSolidos === "multilocular") && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem (Opções incluem):
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Especialista em US (se disponível) -ou</li>
                      <li>RM (com escore O-RADS MRI) -ou</li>
                      <li>Conforme protocolo do ginecologista-oncologista</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista com consulta de ginecologista-oncologista ou exclusivamente por ginecologista-oncologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 3 (Other lesion sem componentes sólidos, margens lisas, Uni- ou bilocular ≥10 cm OU Multilocular CS <4 <10 cm) */}
          {score === 3 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "cystic" && 
           componentesSolidos === "nao" &&
           margensLesao === "smooth" &&
           (morfologiaLesaoMargensLisas === "uni-bilocular-maior-igual-10cm" ||
            morfologiaLesaoMargensLisas === "multilocular-cs-menor-4-menor-10cm") && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem:
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Se não for excisado cirurgicamente, considerar acompanhamento por US em até 6 meses</li>
                      <li>Se sólido, pode considerar especialista em US (se disponível) ou RM (com escore O-RADS MRI)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para O-RADS 4 (Other lesion sem componentes sólidos, margens lisas, Multilocular CS <4 ≥10 cm OU Multilocular CS 4) */}
          {score === 4 && 
           lesaoOvarianaResposta === "other-lesion" && 
           tipoLesaoOutra === "cystic" && 
           componentesSolidos === "nao" &&
           margensLesao === "smooth" &&
           (morfologiaLesaoMargensLisas === "multilocular-cs-menor-4-maior-igual-10cm" ||
            morfologiaLesaoMargensLisas === "multilocular-cs-4") && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-3">
                      Imagem (Opções incluem):
                    </p>
                    <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside ml-4">
                      <li>Especialista em US (se disponível) -ou</li>
                      <li>RM (com escore O-RADS MRI) -ou</li>
                      <li>Conforme protocolo do ginecologista-oncologista</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-black mb-2">
                      Clínico:
                    </p>
                    <p className="text-base text-black dark:text-black">
                      Ginecologista com consulta de ginecologista-oncologista ou exclusivamente por ginecologista-oncologista
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Management Guidelines - Tamanho < 3cm e Pré-menopausa */}
          {(managementGuidelines === "unilocular-smooth-non-simple" || managementGuidelines === "bilocular-smooth") &&
           tamanhoGuidelines === "menor-3cm" &&
           statusMenopausaGuidelines === "premenopausal" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    Nenhum acompanhamento recomendado
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Management Guidelines - Tamanho < 3cm e Pós-menopausa */}
          {(managementGuidelines === "unilocular-smooth-non-simple" || managementGuidelines === "bilocular-smooth") &&
           tamanhoGuidelines === "menor-3cm" &&
           statusMenopausaGuidelines === "postmenopausal" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    Acompanhamento por US em 12 meses*
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Management Guidelines - Tamanho > 3 cm mas < 10 cm */}
          {(managementGuidelines === "unilocular-smooth-non-simple" || managementGuidelines === "bilocular-smooth") &&
           tamanhoGuidelines === "maior-3cm-menor-10cm" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    Acompanhamento por US em 6 meses*
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Simple Cyst - Tamanho < 3cm e Pré-menopausa */}
          {managementGuidelines === "simple-cyst" &&
           tamanhoSimpleCyst === "menor-3cm" &&
           statusMenopausaSimpleCyst === "premenopausal" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    N/A (ver folículo)
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Simple Cyst - Tamanho < 3cm e Pós-menopausa */}
          {managementGuidelines === "simple-cyst" &&
           tamanhoSimpleCyst === "menor-3cm" &&
           statusMenopausaSimpleCyst === "postmenopausal" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-black dark:text-black mb-4">
                    Recomendações:
                  </p>
                  <ul className="space-y-2 text-base text-black dark:text-black list-disc list-inside">
                    <li>Acompanhamento por US em 2-3 meses</li>
                    <li>Especialista em US (se disponível)</li>
                    <li>RM (com escore O-RADS MRI)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Simple Cyst - Tamanho > 3 cm até 5 cm e Pré-menopausa */}
          {managementGuidelines === "simple-cyst" &&
           tamanhoSimpleCyst === "maior-3cm-ate-5cm" &&
           statusMenopausaSimpleCyst === "premenopausal" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    Nenhuma Imagem Adicional Recomendada!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Simple Cyst - Tamanho > 3 cm até 5 cm e Pós-menopausa */}
          {managementGuidelines === "simple-cyst" &&
           tamanhoSimpleCyst === "maior-3cm-ate-5cm" &&
           statusMenopausaSimpleCyst === "postmenopausal" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    Acompanhamento por US em 12 meses*
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações para Simple Cyst - Tamanho > 5 cm mas < 10 cm (Pré ou Pós-menopausa) */}
          {managementGuidelines === "simple-cyst" &&
           tamanhoSimpleCyst === "maior-5cm-menor-10cm" &&
           statusMenopausaSimpleCyst !== "" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-black dark:text-black">
                    Acompanhamento por US em 12 meses*
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

