import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import { calcularLeiCossenos } from "../utils/mathUtils";

const LeiCossenos: React.FC = () => {
  const [formData, setFormData] = useState({
    ladoA: "",
    ladoB: "",
    angulo: "",
    temLadoOposto: true,
  });
  const [resultado, setResultado] = useState<{
    resultado: string;
    passos: string[];
  } | null>(null);
  const [erro, setErro] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro("");
    setResultado(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ladoA || !formData.ladoB || !formData.angulo) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const resultadoCalculo = calcularLeiCossenos(
        parseFloat(formData.ladoA),
        parseFloat(formData.ladoB),
        parseFloat(formData.angulo),
        formData.temLadoOposto
      );
      setResultado(resultadoCalculo);
      setErro("");
    } catch (error) {
      setErro("Erro ao calcular. Verifique os valores inseridos.");
    }
  };

  return (
    <div className="fade-in">
      <Card className="form-container">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">🔺 Lei dos Cossenos</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Lado A</Form.Label>
                  <Form.Control
                    type="number"
                    name="ladoA"
                    value={formData.ladoA}
                    onChange={handleInputChange}
                    placeholder="Ex: 5"
                    step="any"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Lado B</Form.Label>
                  <Form.Control
                    type="number"
                    name="ladoB"
                    value={formData.ladoB}
                    onChange={handleInputChange}
                    placeholder="Ex: 7"
                    step="any"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Ângulo (graus)</Form.Label>
                  <Form.Control
                    type="number"
                    name="angulo"
                    value={formData.angulo}
                    onChange={handleInputChange}
                    placeholder="Ex: 60"
                    step="any"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Tem o lado oposto ao ângulo?"
                checked={formData.temLadoOposto}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    temLadoOposto: e.target.checked,
                  }))
                }
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
              <p className="fw-bold">{resultado.resultado}</p>
              {resultado.passos.map((passo, index) => (
                <div key={index} className="passo-calculo">
                  {passo}
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeiCossenos;
