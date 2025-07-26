import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import { calcularFuncaoSegundoGrau } from "../../utils/mathUtils";

const FuncaoSegundoGrau: React.FC = () => {
  const [formData, setFormData] = useState({
    a: "",
    b: "",
    c: "",
  });
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro("");
    setResultado(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.a || !formData.b || !formData.c) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const resultadoCalculo = calcularFuncaoSegundoGrau(
        parseFloat(formData.a),
        parseFloat(formData.b),
        parseFloat(formData.c)
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
          <h4 className="mb-0">📊 Função do Segundo Grau</h4>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-4">
            Calcule raízes e vértice da função f(x) = ax² + bx + c
          </p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Coeficiente a</Form.Label>
                  <Form.Control
                    type="number"
                    name="a"
                    value={formData.a}
                    onChange={handleInputChange}
                    placeholder="Ex: 1"
                    step="any"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Coeficiente b</Form.Label>
                  <Form.Control
                    type="number"
                    name="b"
                    value={formData.b}
                    onChange={handleInputChange}
                    placeholder="Ex: -5"
                    step="any"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Coeficiente c</Form.Label>
                  <Form.Control
                    type="number"
                    name="c"
                    value={formData.c}
                    onChange={handleInputChange}
                    placeholder="Ex: 6"
                    step="any"
                  />
                </Form.Group>
              </Col>
            </Row>

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
              {resultado.passos.map((passo: string, index: number) => (
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

export default FuncaoSegundoGrau;
