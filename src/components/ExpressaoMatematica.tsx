import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const ExpressaoMatematica: React.FC = () => {
  const [expressao, setExpressao] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!expressao.trim()) {
      setErro("Por favor, insira uma expressão matemática.");
      return;
    }

    try {
      // Implementação básica - você pode expandir depois
      const resultadoCalculo = eval(expressao);
      setResultado(`Resultado: ${resultadoCalculo}`);
      setErro("");
    } catch (error) {
      setErro("Expressão inválida. Verifique a sintaxe.");
    }
  };

  return (
    <div className="fade-in">
      <Card className="form-container">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">🧮 Expressão Matemática</h4>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-4">
            Avalie expressões matemáticas complexas.
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Expressão Matemática</Form.Label>
              <Form.Control
                type="text"
                value={expressao}
                onChange={(e) => setExpressao(e.target.value)}
                placeholder="Ex: 2 + 3 * (4 - 1)"
                size="lg"
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-custom">
              🧮 Calcular
            </Button>
          </Form>

          {erro && (
            <Alert variant="danger" className="mt-3">
              ⚠️ {erro}
            </Alert>
          )}

          {resultado && (
            <div className="resultado-container mt-4">
              <h5 className="text-primary mb-3">📊 Resultado</h5>
              <p className="fw-bold">{resultado}</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">ℹ️ Operadores Suportados</h5>
        </Card.Header>
        <Card.Body>
          <ul>
            <li>Adição: +</li>
            <li>Subtração: -</li>
            <li>Multiplicação: *</li>
            <li>Divisão: /</li>
            <li>Potenciação: **</li>
            <li>Parênteses: ()</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExpressaoMatematica;
