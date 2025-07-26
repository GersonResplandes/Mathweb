import React from "react";

interface FracaoProps {
  numerador: string | number;
  denominador: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Fracao: React.FC<FracaoProps> = ({
  numerador,
  denominador,
  className = "",
  style = {},
}) => {
  return (
    <span className={`fracao ${className}`} style={style}>
      <span className="numerador">{numerador}</span>
      <span className="fracao-linha"></span>
      <span className="denominador">{denominador}</span>
    </span>
  );
};

export default Fracao;
