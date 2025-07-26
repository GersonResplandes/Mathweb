import React from "react";

interface FracaoProps {
  numerador: string | number;
  denominador: string | number;
  className?: string;
}

const Fracao: React.FC<FracaoProps> = ({
  numerador,
  denominador,
  className = "",
}) => {
  // Função para verificar se o valor contém raiz quadrada
  const temRaiz = (valor: string | number): boolean => {
    return String(valor).includes("√");
  };

  // Função para extrair o valor da raiz
  const extrairRaiz = (valor: string): { raiz: string; resto: string } => {
    const match = valor.match(/√(\d+)/);
    if (match) {
      return {
        raiz: match[1],
        resto: valor.replace(/√\d+/, ""),
      };
    }
    return { raiz: "", resto: valor };
  };

  // Renderizar numerador
  const renderizarNumerador = (valor: string | number) => {
    const valorStr = String(valor);

    if (temRaiz(valorStr)) {
      const { raiz, resto } = extrairRaiz(valorStr);
      return (
        <span className="numerador">
          {resto && <span>{resto}</span>}
          <span className="raiz-simbolo">√</span>
          <span className="raiz-valor">{raiz}</span>
        </span>
      );
    }

    return <span className="numerador">{valorStr}</span>;
  };

  // Renderizar denominador
  const renderizarDenominador = (valor: string | number) => {
    const valorStr = String(valor);

    if (temRaiz(valorStr)) {
      const { raiz, resto } = extrairRaiz(valorStr);
      return (
        <span className="denominador">
          {resto && <span>{resto}</span>}
          <span className="raiz-simbolo">√</span>
          <span className="raiz-valor">{raiz}</span>
        </span>
      );
    }

    return <span className="denominador">{valorStr}</span>;
  };

  return (
    <span className={`fracao-caderno ${className}`}>
      {renderizarNumerador(numerador)}
      <span className="fracao-linha"></span>
      {renderizarDenominador(denominador)}
    </span>
  );
};

export default Fracao;
