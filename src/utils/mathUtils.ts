// Função para formatar números
export const formatarNumero = (numero: number): string => {
  if (Number.isInteger(numero)) {
    return numero.toString();
  } else {
    return numero.toFixed(4).replace(/\.?0+$/, "");
  }
};

// Conversão de graus para radianos
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

// Cálculo de cosseno com ângulo negativo
export const cosseno_negativo = (angulo: number): number => {
  return Math.cos(degreesToRadians(angulo));
};

// Cálculo de seno para múltiplos ângulos
export const calcularSenos = (
  angulo1: number,
  angulo2: number,
  angulo3: number,
  angulox1: number
): number[] => {
  const angulo_radianos1 = degreesToRadians(angulo1);
  const angulo_radianos2 = degreesToRadians(angulo2);
  const angulo_radianos3 = degreesToRadians(angulo3);
  const angulo_radianos4 = degreesToRadians(angulox1);

  const seno1 = Math.sin(angulo_radianos1);
  const seno2 = Math.sin(angulo_radianos2);
  const seno3 = Math.sin(angulo_radianos3);
  const senoangulox1 = Math.sin(angulo_radianos4);

  return [seno1, seno2, seno3, senoangulox1];
};

// Cálculo de triângulo retângulo
export const calcularTrianguloRetangulo = (dados: {
  angulo?: number;
  adjacente?: number;
  oposto?: number;
  hipotenusa?: number;
  usarFracao?: boolean;
}): { resultado: string; passos: string[] } => {
  const { angulo, adjacente, oposto, hipotenusa, usarFracao = true } = dados;
  const passos: string[] = [];
  let resultado = "";

  // Verificar quais valores foram fornecidos
  const fornecidos = {
    angulo: angulo !== undefined && !isNaN(angulo) && angulo > 0 && angulo < 90,
    adjacente: adjacente !== undefined && !isNaN(adjacente) && adjacente > 0,
    oposto: oposto !== undefined && !isNaN(oposto) && oposto > 0,
    hipotenusa:
      hipotenusa !== undefined && !isNaN(hipotenusa) && hipotenusa > 0,
  };

  const valoresFornecidos = Object.values(fornecidos).filter(Boolean).length;

  if (valoresFornecidos < 2) {
    resultado = "❌ Erro: Forneça pelo menos dois valores válidos.";
    passos.push("• Ângulo deve estar entre 0° e 90°");
    passos.push("• Lados devem ser positivos");
    passos.push("• Use pelo menos 2 valores para calcular");
    return { resultado, passos };
  }

  // Validar se os valores fazem sentido matematicamente
  if (
    fornecidos.adjacente &&
    fornecidos.hipotenusa &&
    adjacente! >= hipotenusa!
  ) {
    resultado =
      "❌ Erro: O cateto adjacente não pode ser maior ou igual à hipotenusa.";
    passos.push("• Hipotenusa deve ser o maior lado");
    passos.push("• Verifique os valores inseridos");
    return { resultado, passos };
  }

  if (fornecidos.oposto && fornecidos.hipotenusa && oposto! >= hipotenusa!) {
    resultado =
      "❌ Erro: O cateto oposto não pode ser maior ou igual à hipotenusa.";
    passos.push("• Hipotenusa deve ser o maior lado");
    passos.push("• Verifique os valores inseridos");
    return { resultado, passos };
  }

  // Caso 1: Ângulo e Adjacente fornecidos
  if (fornecidos.angulo && fornecidos.adjacente) {
    const anguloRad = degreesToRadians(angulo!);
    const opostoCalculado = adjacente! * Math.tan(anguloRad);
    const hipotenusaCalculada = adjacente! / Math.cos(anguloRad);
    const anguloComplementar = 90 - angulo!;

    const tangenteFormatada = formatarValorTrigonometrico(
      Math.tan(anguloRad),
      angulo!,
      "tangente",
      usarFracao
    );
    const cossenoFormatado = formatarValorTrigonometrico(
      Math.cos(anguloRad),
      angulo!,
      "cosseno",
      usarFracao
    );

    resultado = `✅ Triângulo calculado com sucesso!`;
    passos.push(
      `📐 Dados fornecidos: Ângulo = ${angulo}°, Adjacente = ${adjacente}`
    );
    passos.push(`🔢 Cálculo do cateto oposto:`);
    passos.push(`   tg(${angulo}°) = oposto / ${adjacente}`);
    passos.push(`   oposto = ${adjacente} × tg(${angulo}°)`);
    passos.push(`   oposto = ${adjacente} × ${tangenteFormatada}`);
    passos.push(`   oposto = ${formatarNumero(opostoCalculado)}`);
    passos.push(`🔢 Cálculo da hipotenusa:`);
    passos.push(`   cos(${angulo}°) = ${adjacente} / hipotenusa`);
    passos.push(`   hipotenusa = ${adjacente} / cos(${angulo}°)`);
    passos.push(`   hipotenusa = ${adjacente} / ${cossenoFormatado}`);
    passos.push(`   hipotenusa = ${formatarNumero(hipotenusaCalculada)}`);
    passos.push(`📊 Resultados finais:`);
    passos.push(`   • Ângulo α = ${angulo}°`);
    passos.push(`   • Ângulo β = ${anguloComplementar}°`);
    passos.push(`   • Cateto Adjacente = ${adjacente}`);
    passos.push(`   • Cateto Oposto = ${formatarNumero(opostoCalculado)}`);
    passos.push(`   • Hipotenusa = ${formatarNumero(hipotenusaCalculada)}`);
  }

  // Caso 2: Ângulo e Oposto fornecidos
  else if (fornecidos.angulo && fornecidos.oposto) {
    const anguloRad = degreesToRadians(angulo!);
    const adjacenteCalculado = oposto! / Math.tan(anguloRad);
    const hipotenusaCalculada = oposto! / Math.sin(anguloRad);
    const anguloComplementar = 90 - angulo!;

    const tangenteFormatada = formatarValorTrigonometrico(
      Math.tan(anguloRad),
      angulo!,
      "tangente",
      usarFracao
    );
    const senoFormatado = formatarValorTrigonometrico(
      Math.sin(anguloRad),
      angulo!,
      "seno",
      usarFracao
    );

    resultado = `✅ Triângulo calculado com sucesso!`;
    passos.push(`📐 Dados fornecidos: Ângulo = ${angulo}°, Oposto = ${oposto}`);
    passos.push(`🔢 Cálculo do cateto adjacente:`);
    passos.push(`   tg(${angulo}°) = ${oposto} / adjacente`);
    passos.push(`   adjacente = ${oposto} / tg(${angulo}°)`);
    passos.push(`   adjacente = ${oposto} / ${tangenteFormatada}`);
    passos.push(`   adjacente = ${formatarNumero(adjacenteCalculado)}`);
    passos.push(`🔢 Cálculo da hipotenusa:`);
    passos.push(`   sen(${angulo}°) = ${oposto} / hipotenusa`);
    passos.push(`   hipotenusa = ${oposto} / sen(${angulo}°)`);
    passos.push(`   hipotenusa = ${oposto} / ${senoFormatado}`);
    passos.push(`   hipotenusa = ${formatarNumero(hipotenusaCalculada)}`);
    passos.push(`📊 Resultados finais:`);
    passos.push(`   • Ângulo α = ${angulo}°`);
    passos.push(`   • Ângulo β = ${anguloComplementar}°`);
    passos.push(
      `   • Cateto Adjacente = ${formatarNumero(adjacenteCalculado)}`
    );
    passos.push(`   • Cateto Oposto = ${oposto}`);
    passos.push(`   • Hipotenusa = ${formatarNumero(hipotenusaCalculada)}`);
  }

  // Caso 3: Adjacente e Oposto fornecidos
  else if (fornecidos.adjacente && fornecidos.oposto) {
    const hipotenusaCalculada = Math.sqrt(adjacente! ** 2 + oposto! ** 2);
    const anguloCalculado = Math.atan(oposto! / adjacente!) * (180 / Math.PI);
    const anguloComplementar = 90 - anguloCalculado;

    resultado = `✅ Triângulo calculado com sucesso!`;
    passos.push(
      `📐 Dados fornecidos: Adjacente = ${adjacente}, Oposto = ${oposto}`
    );
    passos.push(`🔢 Cálculo da hipotenusa (Teorema de Pitágoras):`);
    passos.push(`   hipotenusa² = ${adjacente}² + ${oposto}²`);
    passos.push(`   hipotenusa² = ${adjacente! ** 2} + ${oposto! ** 2}`);
    passos.push(`   hipotenusa² = ${adjacente! ** 2 + oposto! ** 2}`);
    passos.push(`   hipotenusa = √${adjacente! ** 2 + oposto! ** 2}`);
    passos.push(`   hipotenusa = ${formatarNumero(hipotenusaCalculada)}`);
    passos.push(`🔢 Cálculo do ângulo α:`);
    passos.push(`   tg(α) = ${oposto} / ${adjacente}`);
    passos.push(`   α = tg⁻¹(${oposto} / ${adjacente})`);
    passos.push(`   α = tg⁻¹(${formatarNumero(oposto! / adjacente!)})`);
    passos.push(`   α = ${formatarNumero(anguloCalculado)}°`);
    passos.push(`📊 Resultados finais:`);
    passos.push(`   • Ângulo α = ${formatarNumero(anguloCalculado)}°`);
    passos.push(`   • Ângulo β = ${formatarNumero(anguloComplementar)}°`);
    passos.push(`   • Cateto Adjacente = ${adjacente}`);
    passos.push(`   • Cateto Oposto = ${oposto}`);
    passos.push(`   • Hipotenusa = ${formatarNumero(hipotenusaCalculada)}`);
  }

  // Caso 4: Adjacente e Hipotenusa fornecidos
  else if (fornecidos.adjacente && fornecidos.hipotenusa) {
    const opostoCalculado = Math.sqrt(hipotenusa! ** 2 - adjacente! ** 2);
    const anguloCalculado =
      Math.acos(adjacente! / hipotenusa!) * (180 / Math.PI);
    const anguloComplementar = 90 - anguloCalculado;

    const cossenoFormatado = formatarValorTrigonometrico(
      adjacente! / hipotenusa!,
      anguloCalculado,
      "cosseno",
      usarFracao
    );

    resultado = `✅ Triângulo calculado com sucesso!`;
    passos.push(
      `📐 Dados fornecidos: Adjacente = ${adjacente}, Hipotenusa = ${hipotenusa}`
    );
    passos.push(`🔢 Cálculo do cateto oposto (Teorema de Pitágoras):`);
    passos.push(`   oposto² = ${hipotenusa}² - ${adjacente}²`);
    passos.push(`   oposto² = ${hipotenusa! ** 2} - ${adjacente! ** 2}`);
    passos.push(`   oposto² = ${hipotenusa! ** 2 - adjacente! ** 2}`);
    passos.push(`   oposto = √${hipotenusa! ** 2 - adjacente! ** 2}`);
    passos.push(`   oposto = ${formatarNumero(opostoCalculado)}`);
    passos.push(`🔢 Cálculo do ângulo α:`);
    passos.push(
      `   cos(α) = ${adjacente} / ${hipotenusa} = ${cossenoFormatado}`
    );
    passos.push(`   α = cos⁻¹(${adjacente} / ${hipotenusa})`);
    passos.push(`   α = cos⁻¹(${formatarNumero(adjacente! / hipotenusa!)})`);
    passos.push(`   α = ${formatarNumero(anguloCalculado)}°`);
    passos.push(`📊 Resultados finais:`);
    passos.push(`   • Ângulo α = ${formatarNumero(anguloCalculado)}°`);
    passos.push(`   • Ângulo β = ${formatarNumero(anguloComplementar)}°`);
    passos.push(`   • Cateto Adjacente = ${adjacente}`);
    passos.push(`   • Cateto Oposto = ${formatarNumero(opostoCalculado)}`);
    passos.push(`   • Hipotenusa = ${hipotenusa}`);
  }

  // Caso 5: Oposto e Hipotenusa fornecidos
  else if (fornecidos.oposto && fornecidos.hipotenusa) {
    const adjacenteCalculado = Math.sqrt(hipotenusa! ** 2 - oposto! ** 2);
    const anguloCalculado = Math.asin(oposto! / hipotenusa!) * (180 / Math.PI);
    const anguloComplementar = 90 - anguloCalculado;

    const senoFormatado = formatarValorTrigonometrico(
      oposto! / hipotenusa!,
      anguloCalculado,
      "seno",
      usarFracao
    );

    resultado = `✅ Triângulo calculado com sucesso!`;
    passos.push(
      `📐 Dados fornecidos: Oposto = ${oposto}, Hipotenusa = ${hipotenusa}`
    );
    passos.push(`🔢 Cálculo do cateto adjacente (Teorema de Pitágoras):`);
    passos.push(`   adjacente² = ${hipotenusa}² - ${oposto}²`);
    passos.push(`   adjacente² = ${hipotenusa! ** 2} - ${oposto! ** 2}`);
    passos.push(`   adjacente² = ${hipotenusa! ** 2 - oposto! ** 2}`);
    passos.push(`   adjacente = √${hipotenusa! ** 2 - oposto! ** 2}`);
    passos.push(`   adjacente = ${formatarNumero(adjacenteCalculado)}`);
    passos.push(`🔢 Cálculo do ângulo α:`);
    passos.push(`   sen(α) = ${oposto} / ${hipotenusa} = ${senoFormatado}`);
    passos.push(`   α = sen⁻¹(${oposto} / ${hipotenusa})`);
    passos.push(`   α = sen⁻¹(${formatarNumero(oposto! / hipotenusa!)})`);
    passos.push(`   α = ${formatarNumero(anguloCalculado)}°`);
    passos.push(`📊 Resultados finais:`);
    passos.push(`   • Ângulo α = ${formatarNumero(anguloCalculado)}°`);
    passos.push(`   • Ângulo β = ${formatarNumero(anguloComplementar)}°`);
    passos.push(
      `   • Cateto Adjacente = ${formatarNumero(adjacenteCalculado)}`
    );
    passos.push(`   • Cateto Oposto = ${oposto}`);
    passos.push(`   • Hipotenusa = ${hipotenusa}`);
  }

  // Caso 6: Ângulo e Hipotenusa fornecidos
  else if (fornecidos.angulo && fornecidos.hipotenusa) {
    const anguloRad = degreesToRadians(angulo!);
    const opostoCalculado = hipotenusa! * Math.sin(anguloRad);
    const adjacenteCalculado = hipotenusa! * Math.cos(anguloRad);
    const anguloComplementar = 90 - angulo!;

    const senoFormatado = formatarValorTrigonometrico(
      Math.sin(anguloRad),
      angulo!,
      "seno",
      usarFracao
    );
    const cossenoFormatado = formatarValorTrigonometrico(
      Math.cos(anguloRad),
      angulo!,
      "cosseno",
      usarFracao
    );

    resultado = `✅ Triângulo calculado com sucesso!`;
    passos.push(
      `📐 Dados fornecidos: Ângulo = ${angulo}°, Hipotenusa = ${hipotenusa}`
    );
    passos.push(`🔢 Cálculo do cateto oposto:`);
    passos.push(`   sen(${angulo}°) = oposto / ${hipotenusa}`);
    passos.push(`   oposto = ${hipotenusa} × sen(${angulo}°)`);
    passos.push(`   oposto = ${hipotenusa} × ${senoFormatado}`);
    passos.push(`   oposto = ${formatarNumero(opostoCalculado)}`);
    passos.push(`🔢 Cálculo do cateto adjacente:`);
    passos.push(`   cos(${angulo}°) = adjacente / ${hipotenusa}`);
    passos.push(`   adjacente = ${hipotenusa} × cos(${angulo}°)`);
    passos.push(`   adjacente = ${hipotenusa} × ${cossenoFormatado}`);
    passos.push(`   adjacente = ${formatarNumero(adjacenteCalculado)}`);
    passos.push(`📊 Resultados finais:`);
    passos.push(`   • Ângulo α = ${angulo}°`);
    passos.push(`   • Ângulo β = ${anguloComplementar}°`);
    passos.push(
      `   • Cateto Adjacente = ${formatarNumero(adjacenteCalculado)}`
    );
    passos.push(`   • Cateto Oposto = ${formatarNumero(opostoCalculado)}`);
    passos.push(`   • Hipotenusa = ${hipotenusa}`);
  } else {
    resultado = "❌ Erro: Combinação de valores não suportada.";
    passos.push("• Forneça pelo menos 2 valores válidos");
    passos.push("• Ângulos devem estar entre 0° e 90°");
    passos.push("• Lados devem ser positivos");
  }

  return { resultado, passos };
};

// Cálculo de Lei dos Cossenos
export const calcularLeiCossenos = (
  ladoA: number,
  ladoB: number,
  angulo: number,
  temLadoOposto: boolean
): { resultado: string; passos: string[] } => {
  const passos: string[] = [];
  let resultado = "";

  if (temLadoOposto) {
    const coseno = cosseno_negativo(angulo);
    const x2 = ladoA ** 2 + ladoB ** 2 - 2 * ladoA * ladoB * coseno;
    const x = Math.sqrt(x2);

    resultado = `x² = a² + b² - 2*a*b*cos(θ)`;
    passos.push(
      `x² = ${ladoA}² + ${ladoB}² - 2*${ladoA}*${ladoB}*cos(${angulo})`
    );
    passos.push(
      `x² = ${formatarNumero(ladoA ** 2)} + ${formatarNumero(
        ladoB ** 2
      )} - ${formatarNumero(2 * ladoA * ladoB)}*${formatarNumero(coseno)}`
    );
    passos.push(`x² = ${formatarNumero(x2)}`);
    passos.push(`x = ${formatarNumero(x)}`);
  } else {
    const coseno = cosseno_negativo(angulo);
    const discriminante = Math.sqrt(
      4 * ladoA ** 2 * coseno ** 2 + 4 * ladoA ** 2 - 4 * ladoB ** 2
    );
    const x1 = ladoA * coseno + discriminante / 2;
    const x2 = ladoA * coseno - discriminante / 2;

    resultado = `x = 2b * cos(θ) ± √(4b² * cos²(θ) + 4a² - 4b²) / 2`;
    passos.push(`x1 = ${formatarNumero(x1)}`);
    passos.push(`x2 = ${formatarNumero(x2)}`);
  }

  return { resultado, passos };
};

// Conversão de temperatura
export const converterTemperatura = (
  tipo: string,
  valor: number
): { resultado: string; passos: string[] } => {
  const passos: string[] = [];
  let resultado = "";

  switch (tipo) {
    case "celsiusToKelvin": {
      const kelvin = valor + 273.15;
      resultado = `T(K) = T(°C) + 273.15`;
      passos.push(`T(K) = ${valor} + 273.15 = ${formatarNumero(kelvin)}`);
      break;
    }
    case "kelvinToCelsius": {
      const celsius = valor - 273.15;
      resultado = `T(°C) = T(K) - 273.15`;
      passos.push(`T(°C) = ${valor} - 273.15 = ${formatarNumero(celsius)}`);
      break;
    }
    case "celsiusToFahrenheit": {
      const fahrenheit = (valor / 5) * 9 + 32;
      resultado = `T(°F) = (T(°C) / 5) * 9 + 32`;
      passos.push(
        `T(°F) = (${valor} / 5) * 9 + 32 = ${formatarNumero(fahrenheit)}`
      );
      break;
    }
    case "fahrenheitToCelsius": {
      const celsiusFromF = ((valor - 32) / 9) * 5;
      resultado = `T(°C) = ((T(°F) - 32) / 9) * 5`;
      passos.push(
        `T(°C) = ((${valor} - 32) / 9) * 5 = ${formatarNumero(celsiusFromF)}`
      );
      break;
    }
    default:
      resultado = "Conversão não suportada";
  }

  return { resultado, passos };
};

// Cálculo de função do segundo grau
export const calcularFuncaoSegundoGrau = (
  a: number,
  b: number,
  c: number
): {
  resultado: string;
  passos: string[];
  raizes?: number[];
  vertice?: { x: number; y: number };
} => {
  const passos: string[] = [];
  let resultado = "";

  if (a === 0) {
    return { resultado: "O valor de 'a' não pode ser zero.", passos: [] };
  }

  const delta = b ** 2 - 4 * a * c;
  passos.push(`Δ = b² - 4.a.c`);
  passos.push(`Δ = ${b}² - 4.${a}.${c} = ${delta}`);

  if (delta < 0) {
    resultado = "A equação não possui raízes reais.";
    return { resultado, passos };
  }

  const raiz_delta = Math.sqrt(delta);
  const x1 = (-b + raiz_delta) / (2 * a);
  const x2 = (-b - raiz_delta) / (2 * a);
  const raizes = [x1, x2];

  passos.push(`x = (-${b} ± √${delta}) / (2 * ${a})`);
  passos.push(`x' = ${formatarNumero(x1)}`);
  passos.push(`x'' = ${formatarNumero(x2)}`);

  // Cálculo do vértice
  const Xv = -b / (2 * a);
  const Yv = -delta / (4 * a);
  const vertice = { x: Xv, y: Yv };

  passos.push(`Vértice: (${formatarNumero(Xv)}, ${formatarNumero(Yv)})`);

  resultado = `Raízes: x' = ${formatarNumero(x1)}, x'' = ${formatarNumero(x2)}`;

  return { resultado, passos, raizes, vertice };
};

// Tabela de valores trigonométricos exatos para ângulos comuns
const VALORES_TRIGONOMETRICOS_EXATOS = {
  0: { seno: "0", cosseno: "1", tangente: "0" },
  30: { seno: "1/2", cosseno: "√3/2", tangente: "1/√3" },
  45: { seno: "√2/2", cosseno: "√2/2", tangente: "1" },
  60: { seno: "√3/2", cosseno: "1/2", tangente: "√3" },
  90: { seno: "1", cosseno: "0", tangente: "∞" },
  120: { seno: "√3/2", cosseno: "-1/2", tangente: "-√3" },
  135: { seno: "√2/2", cosseno: "-√2/2", tangente: "-1" },
  150: { seno: "1/2", cosseno: "-√3/2", tangente: "-1/√3" },
  180: { seno: "0", cosseno: "-1", tangente: "0" },
  210: { seno: "-1/2", cosseno: "-√3/2", tangente: "1/√3" },
  225: { seno: "-√2/2", cosseno: "-√2/2", tangente: "1" },
  240: { seno: "-√3/2", cosseno: "-1/2", tangente: "√3" },
  270: { seno: "-1", cosseno: "0", tangente: "∞" },
  300: { seno: "-√3/2", cosseno: "1/2", tangente: "-√3" },
  315: { seno: "-√2/2", cosseno: "√2/2", tangente: "-1" },
  330: { seno: "-1/2", cosseno: "√3/2", tangente: "-1/√3" },
  360: { seno: "0", cosseno: "1", tangente: "0" },
};

// Função para obter valor trigonométrico exato
export const getValorTrigonometricoExato = (
  angulo: number,
  tipo: "seno" | "cosseno" | "tangente"
): string | null => {
  // Normalizar ângulo para 0-360
  const anguloNormalizado = ((angulo % 360) + 360) % 360;

  // Verificar se é um ângulo com valor exato conhecido
  if (VALORES_TRIGONOMETRICOS_EXATOS[anguloNormalizado]) {
    return VALORES_TRIGONOMETRICOS_EXATOS[anguloNormalizado][tipo];
  }

  // Verificar ângulos complementares (90 - angulo)
  const complementar = 90 - anguloNormalizado;
  if (VALORES_TRIGONOMETRICOS_EXATOS[complementar]) {
    switch (tipo) {
      case "seno":
        return VALORES_TRIGONOMETRICOS_EXATOS[complementar].cosseno;
      case "cosseno":
        return VALORES_TRIGONOMETRICOS_EXATOS[complementar].seno;
      case "tangente":
        return VALORES_TRIGONOMETRICOS_EXATOS[complementar].tangente === "∞"
          ? "∞"
          : `1/${VALORES_TRIGONOMETRICOS_EXATOS[complementar].tangente}`;
    }
  }

  return null;
};

// Função para formatar fração com CSS
export const formatarFracao = (fracao: string): string => {
  if (!fracao.includes("/")) return fracao;

  const [numerador, denominador] = fracao.split("/");

  // Se tem raiz quadrada no numerador
  if (numerador.includes("√")) {
    const raiz = numerador.replace("√", "");
    return `<span class="fracao-raiz">
              <span class="raiz-simbolo">√</span>
              <span class="raiz-valor">${raiz}</span>
              <span class="fracao-linha"></span>
              <span class="denominador">${denominador}</span>
            </span>`;
  }

  // Fração simples
  return `<span class="fracao">
            <span class="numerador">${numerador}</span>
            <span class="fracao-linha"></span>
            <span class="denominador">${denominador}</span>
          </span>`;
};

// Função para formatar valor trigonométrico
export const formatarValorTrigonometrico = (
  valor: number,
  angulo: number,
  tipo: "seno" | "cosseno" | "tangente",
  usarFracao: boolean = true
): string => {
  if (usarFracao) {
    const valorExato = getValorTrigonometricoExato(angulo, tipo);
    if (valorExato) {
      return formatarFracao(valorExato);
    }
  }

  return formatarNumero(valor);
};
