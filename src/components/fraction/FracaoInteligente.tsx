import React from "react";
import Fracao from "./Fracao";
import FracaoRaiz from "./FracaoRaiz";

interface FracaoInteligenteProps {
  numerador: string | number;
  denominador: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const FracaoInteligente: React.FC<FracaoInteligenteProps> = ({
  numerador,
  denominador,
  className = "",
  style = {},
}) => {
  const numeradorStr = String(numerador);
  const denominadorStr = String(denominador);

  // Verificar se o numerador contém raiz quadrada
  if (numeradorStr.includes("√")) {
    const raiz = numeradorStr.replace("√", "");
    return (
      <FracaoRaiz
        raiz={raiz}
        denominador={denominador}
        className={className}
        style={style}
      />
    );
  }

  // Verificar se o denominador contém raiz quadrada
  if (denominadorStr.includes("√")) {
    const raiz = denominadorStr.replace("√", "");
    return (
      <span className={`fracao-invertida ${className}`} style={style}>
        <span className="numerador">{numerador}</span>
        <span className="fracao-linha"></span>
        <span className="denominador">
          <span className="raiz-simbolo">√</span>
          <span className="raiz-valor">{raiz}</span>
        </span>
      </span>
    );
  }

  // Fração normal
  return (
    <Fracao
      numerador={numerador}
      denominador={denominador}
      className={className}
      style={style}
    />
  );
};

export default FracaoInteligente;
