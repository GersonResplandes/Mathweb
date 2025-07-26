import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import { converterTemperatura } from "../utils/mathUtils";
import { TipoConversao } from "../types";

const ConversorTemperatura: React.FC = () => {
  const [tipoConversao, setTipoConversao] = useState<TipoConversao | "">("");
  const [valor, setValor] = useState<string>("");
  const [resultado, setResultado] = useState<{
    resultado: string;
    passos: string[];
  } | null>(null);
  const [erro, setErro] = useState<string>("");

  const opcoesConversao = [
    {
      value: "celsiusToKelvin",
      label: "Celsius (°C) → Kelvin (K)",
      icone: "❄️→🔥",
    },
    {
      value: "kelvinToCelsius",
      label: "Kelvin (K) → Celsius (°C)",
      icone: "🔥→❄️",
    },
    {
      value: "celsiusToFahrenheit",
      label: "Celsius (°C) → Fahrenheit (°F)",
      icone: "❄️→🌡️",
    },
    {
      value: "fahrenheitToCelsius",
      label: "Fahrenheit (°F) → Celsius (°C)",
      icone: "🌡️→❄️",
    },
    {
      value: "kelvinToFahrenheit",
      label: "Kelvin (K) → Fahrenheit (°F)",
      icone: "🔥→🌡️",
    },
    {
      value: "fahrenheitToKelvin",
      label: "Fahrenheit (°F) → Kelvin (K)",
      icone: "🌡️→🔥",
    },
  ];

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoConversao(e.target.value as TipoConversao);
    setResultado(null);
    setErro("");
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
    setResultado(null);
    setErro("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tipoConversao) {
      setErro("Por favor, selecione um tipo de conversão.");
      return;
    }

    if (!valor || isNaN(parseFloat(valor))) {
      setErro("Por favor, insira um valor numérico válido.");
      return;
    }

    try {
      const resultadoCalculo = converterTemperatura(
        tipoConversao,
        parseFloat(valor)
      );
      setResultado(resultadoCalculo);
      setErro("");
    } catch (error) {
      setErro("Erro ao converter temperatura. Verifique o valor inserido.");
    }
  };

  const limparFormulario = () => {
    setTipoConversao("");
    setValor("");
    setResultado(null);
    setErro("");
  };

  const getUnidadeOrigem = () => {
    switch (tipoConversao) {
      case "celsiusToKelvin":
      case "celsiusToFahrenheit":
        return "°C";
      case "kelvinToCelsius":
      case "kelvinToFahrenheit":
        return "K";
      case "fahrenheitToCelsius":
      case "fahrenheitToKelvin":
        return "°F";
      default:
        return "";
    }
  };

  const getUnidadeDestino = () => {
    switch (tipoConversao) {
      case "celsiusToKelvin":
      case "fahrenheitToKelvin":
        return "K";
      case "kelvinToCelsius":
      case "fahrenheitToCelsius":
        return "°C";
      case "celsiusToFahrenheit":
      case "kelvinToFahrenheit":
        return "°F";
      default:
        return "";
    }
  };

  return (
    <div className="fade-in">
      <Card className="form-container">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">🌡️ Conversor de Temperatura</h4>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-4">
            Converta temperaturas entre Celsius, Fahrenheit e Kelvin com
            explicações detalhadas.
          </p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="tipoConversao">
                    Tipo de Conversão
                  </Form.Label>
                  <Form.Select
                    id="tipoConversao"
                    value={tipoConversao}
                    onChange={handleTipoChange}
                  >
                    <option value="">Selecione uma conversão...</option>
                    {opcoesConversao.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.icone} {opcao.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="valor">
                    Temperatura em {getUnidadeOrigem()}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="valor"
                    value={valor}
                    onChange={handleValorChange}
                    placeholder={`Ex: 25`}
                    step="any"
                    disabled={!tipoConversao}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                variant="primary"
                className="btn-custom"
                disabled={!tipoConversao || !valor}
              >
                🔄 Converter
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={limparFormulario}
              >
                🔄 Limpar
              </Button>
            </div>
          </Form>

          {erro && (
            <Alert variant="danger" className="mt-3">
              ⚠️ {erro}
            </Alert>
          )}

          {resultado && (
            <div className="resultado-container mt-4">
              <h5 className="text-primary mb-3">
                📊 Resultado: {valor} {getUnidadeOrigem()} ={" "}
                {resultado.passos[resultado.passos.length - 1]
                  ?.split("=")
                  .pop()
                  ?.trim()}{" "}
                {getUnidadeDestino()}
              </h5>

              <div className="mt-3">
                <h6 className="text-success mb-2">📝 Passos do Cálculo:</h6>
                {resultado.passos.map((passo, index) => (
                  <div key={index} className="passo-calculo">
                    {passo}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Informações sobre as escalas */}
      <Card className="mt-4">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">ℹ️ Sobre as Escalas de Temperatura</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <h6>❄️ Celsius (°C)</h6>
              <ul className="list-unstyled small">
                <li>• Ponto de congelamento: 0°C</li>
                <li>• Ponto de ebulição: 100°C</li>
                <li>• Usada na maioria dos países</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>🌡️ Fahrenheit (°F)</h6>
              <ul className="list-unstyled small">
                <li>• Ponto de congelamento: 32°F</li>
                <li>• Ponto de ebulição: 212°F</li>
                <li>• Usada principalmente nos EUA</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>🔥 Kelvin (K)</h6>
              <ul className="list-unstyled small">
                <li>• Zero absoluto: 0K</li>
                <li>• Ponto de ebulição: 373.15K</li>
                <li>• Escala científica padrão</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fórmulas de conversão */}
      <Card className="mt-4">
        <Card.Header className="bg-success text-white">
          <h5 className="mb-0">📐 Fórmulas de Conversão</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>Celsius ↔ Fahrenheit:</h6>
              <div className="passo-calculo">
                °F = (°C × 9/5) + 32
                <br />
                °C = (°F - 32) × 5/9
              </div>
            </Col>
            <Col md={6}>
              <h6>Celsius ↔ Kelvin:</h6>
              <div className="passo-calculo">
                K = °C + 273.15
                <br />
                °C = K - 273.15
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ConversorTemperatura;
