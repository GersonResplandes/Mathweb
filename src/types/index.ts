// Tipos para Triângulo Retângulo
export interface TrianguloRetangulo {
  angulo?: number;
  adjacente?: number;
  oposto?: number;
  hipotenusa?: number;
}

// Tipos para Lei dos Cossenos
export interface LeiCossenos {
  ladoA: number;
  ladoB: number;
  angulo: number;
  temLadoOposto: boolean;
}

// Tipos para Lei dos Senos
export interface LeiSenos {
  anguloA: number;
  anguloB: number;
  ladoConhecido: number;
  anguloOposto: number;
  anguloDesejado: "angulo1" | "angulo2" | "terceiro_angulo";
}

// Tipos para Conversão de Temperatura
export type TipoConversao =
  | "celsiusToKelvin"
  | "kelvinToCelsius"
  | "celsiusToFahrenheit"
  | "fahrenheitToCelsius"
  | "kelvinToFahrenheit"
  | "fahrenheitToKelvin";

// Tipos para Função do Segundo Grau
export interface FuncaoSegundoGrau {
  a: number;
  b: number;
  c: number;
}

// Tipos para Expressão Matemática
export interface ExpressaoMatematica {
  expressao: string;
  resultado?: number;
}

// Tipos para Resultados
export interface ResultadoCalculo {
  tipo: string;
  dados: any;
  resultado: string;
  passos?: string[];
}

// Tipos para Componentes
export interface ComponenteCalculadora {
  titulo: string;
  descricao: string;
  icone: string;
  componente: any; // React.ComponentType;
}
