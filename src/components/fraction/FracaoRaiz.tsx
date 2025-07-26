import React from "react";

interface FracaoRaizProps {
  raiz: string | number;
  denominador: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const FracaoRaiz: React.FC<FracaoRaizProps> = ({
  raiz,
  denominador,
  className = "",
  style = {},
}) => {
  return (
    <span className={`fracao-raiz ${className}`} style={style}>
      <span className="raiz-simbolo">√</span>
      <span className="raiz-valor">{raiz}</span>
      <span className="fracao-linha"></span>
      <span className="denominador">{denominador}</span>
    </span>
  );
};

export default FracaoRaiz;
