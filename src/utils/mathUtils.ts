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
}): { resultado: string; passos: string[] } => {
  const { angulo, adjacente, oposto, hipotenusa } = dados;
  const passos: string[] = [];
  let resultado = "";

  // Verificar quais valores foram fornecidos
  const fornecidos = {
    angulo: !isNaN(angulo || 0),
    adjacente: !isNaN(adjacente || 0),
    oposto: !isNaN(oposto || 0),
    hipotenusa: !isNaN(hipotenusa || 0),
  };

  if (fornecidos.angulo && fornecidos.adjacente) {
    const tangente = Math.tan((angulo! * Math.PI) / 180);
    resultado = `Usando Tangente: tgθ = oposto / adjacente`;
    passos.push(`tg${angulo} = x / ${adjacente}`);
    passos.push(`${formatarNumero(tangente)} = x / ${adjacente}`);
    passos.push(`x = ${formatarNumero(tangente * adjacente!)}`);
  } else if (fornecidos.adjacente && fornecidos.oposto) {
    const hip = Math.sqrt(adjacente! ** 2 + oposto! ** 2);
    const anguloCalculado = Math.atan(oposto! / adjacente!) * (180 / Math.PI);
    resultado = `Usando Pitágoras e Arcotangente`;
    passos.push(`hip = √(${adjacente}² + ${oposto}²) = ${formatarNumero(hip)}`);
    passos.push(
      `θ = tg⁻¹(${oposto} / ${adjacente}) = ${formatarNumero(anguloCalculado)}°`
    );
  } else if (fornecidos.adjacente && fornecidos.hipotenusa) {
    const op = Math.sqrt(hipotenusa! ** 2 - adjacente! ** 2);
    const anguloCalculado =
      Math.acos(adjacente! / hipotenusa!) * (180 / Math.PI);
    resultado = `Usando Pitágoras e Arcocosseno`;
    passos.push(
      `op = √(${hipotenusa}² - ${adjacente}²) = ${formatarNumero(op)}`
    );
    passos.push(
      `θ = cos⁻¹(${adjacente} / ${hipotenusa}) = ${formatarNumero(
        anguloCalculado
      )}°`
    );
  } else if (fornecidos.oposto && fornecidos.hipotenusa) {
    const adj = Math.sqrt(hipotenusa! ** 2 - oposto! ** 2);
    const anguloCalculado = Math.asin(oposto! / hipotenusa!) * (180 / Math.PI);
    resultado = `Usando Pitágoras e Arcoseno`;
    passos.push(
      `adj = √(${hipotenusa}² - ${oposto}²) = ${formatarNumero(adj)}`
    );
    passos.push(
      `θ = sin⁻¹(${oposto} / ${hipotenusa}) = ${formatarNumero(
        anguloCalculado
      )}°`
    );
  } else {
    resultado = "Por favor, forneça pelo menos dois valores.";
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
