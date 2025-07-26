import React from "react";
import Fracao from "./Fracao";
import FracaoRaiz from "./FracaoRaiz";
import FracaoInteligente from "./FracaoInteligente";

const ExemploFracoes: React.FC = () => {
  return (
    <div className="container mt-4">
      <h3>📚 Exemplos de Uso dos Componentes de Fração</h3>

      <div className="row">
        <div className="col-md-6">
          <h5>🔢 Fração Simples</h5>
          <div className="mb-3">
            <Fracao numerador="3" denominador="4" />
            <span className="ms-2">= 0.75</span>
          </div>

          <h5>🔢 Fração com Raiz (Numerador)</h5>
          <div className="mb-3">
            <FracaoRaiz raiz="3" denominador="2" />
            <span className="ms-2">≈ 0.866</span>
          </div>

          <h5>🔢 Fração Inteligente (Detecta Automaticamente)</h5>
          <div className="mb-3">
            <FracaoInteligente numerador="1" denominador="2" />
            <span className="ms-2">= 0.5</span>
          </div>

          <div className="mb-3">
            <FracaoInteligente numerador="√3" denominador="2" />
            <span className="ms-2">≈ 0.866</span>
          </div>
        </div>

        <div className="col-md-6">
          <h5>🎨 Frações com Estilos</h5>
          <div className="mb-3">
            <Fracao numerador="5" denominador="8" className="fracao-grande" />
            <span className="ms-2">(Grande)</span>
          </div>

          <div className="mb-3">
            <Fracao numerador="2" denominador="3" className="fracao-colorida" />
            <span className="ms-2">(Colorida)</span>
          </div>

          <div className="mb-3">
            <Fracao numerador="7" denominador="9" className="fracao-destaque" />
            <span className="ms-2">(Destacada)</span>
          </div>

          <h5>📐 Exemplos Matemáticos</h5>
          <div className="mb-3">
            <span>sen(30°) = </span>
            <FracaoInteligente numerador="1" denominador="2" />
          </div>

          <div className="mb-3">
            <span>cos(60°) = </span>
            <FracaoInteligente numerador="1" denominador="2" />
          </div>

          <div className="mb-3">
            <span>tg(45°) = </span>
            <FracaoInteligente numerador="1" denominador="1" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5>💡 Como Usar no Seu Código:</h5>
        <pre className="bg-light p-3 rounded">
          {`// Fração simples
<Fracao numerador="3" denominador="4" />

// Fração com raiz
<FracaoRaiz raiz="3" denominador="2" />

// Fração inteligente (recomendado)
<FracaoInteligente numerador="√3" denominador="2" />

// Com estilos
<FracaoInteligente 
  numerador="5" 
  denominador="8" 
  className="fracao-grande fracao-colorida" 
/>`}
        </pre>
      </div>
    </div>
  );
};

export default ExemploFracoes;
