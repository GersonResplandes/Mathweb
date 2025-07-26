import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  FormCheck,
} from "react-bootstrap";
import { calcularTrianguloRetangulo } from "../utils/mathUtils";
import Fracao from "./Fracao";

const TrianguloRetangulo: React.FC = () => {
  const [formData, setFormData] = useState({
    angulo: "",
    adjacente: "",
    oposto: "",
    hipotenusa: "",
  });
  const [usarFracao, setUsarFracao] = useState(true);
  const [resultado, setResultado] = useState<{
    resultado: string;
    passos: string[];
  } | null>(null);
  const [erro, setErro] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErro("");
    setResultado(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se pelo menos dois valores foram fornecidos
    const valoresFornecidos = Object.values(formData).filter(
      (val) => val !== ""
    ).length;

    if (valoresFornecidos < 2) {
      setErro("Por favor, forneça pelo menos dois valores para calcular.");
      return;
    }

    try {
      const dados = {
        angulo: formData.angulo ? parseFloat(formData.angulo) : undefined,
        adjacente: formData.adjacente
          ? parseFloat(formData.adjacente)
          : undefined,
        oposto: formData.oposto ? parseFloat(formData.oposto) : undefined,
        hipotenusa: formData.hipotenusa
          ? parseFloat(formData.hipotenusa)
          : undefined,
        usarFracao: usarFracao,
      };

      const resultadoCalculo = calcularTrianguloRetangulo(dados);
      setResultado(resultadoCalculo);
      setErro("");
    } catch (error) {
      setErro("Erro ao calcular. Verifique os valores inseridos.");
    }
  };

  const limparFormulario = () => {
    setFormData({
      angulo: "",
      adjacente: "",
      oposto: "",
      hipotenusa: "",
    });
    setResultado(null);
    setErro("");
  };

  return (
    <div className="fade-in">
      <Card className="form-container">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">📐 Triângulo Retângulo</h4>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-4">
            Forneça pelo menos dois valores para calcular os demais usando
            trigonometria.
          </p>

          {/* Opção de formato */}
          <div className="mb-4 p-3 bg-light rounded">
            <FormCheck
              type="switch"
              id="usar-fracao"
              label={
                <span>
                  <strong>📊 Exibir frações trigonométricas exatas</strong>
                  <br />
                  <small className="text-muted">
                    {usarFracao
                      ? "Ex: sen(30°) = 1/2, cos(30°) = √3/2"
                      : "Ex: sen(30°) = 0.5, cos(30°) = 0.8660"}
                  </small>
                </span>
              }
              checked={usarFracao}
              onChange={(e) => setUsarFracao(e.target.checked)}
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="angulo">Ângulo α (graus)</Form.Label>
                  <Form.Control
                    type="number"
                    id="angulo"
                    name="angulo"
                    value={formData.angulo}
                    onChange={handleInputChange}
                    placeholder="Ex: 30"
                    step="any"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="adjacente">Cateto Adjacente</Form.Label>
                  <Form.Control
                    type="number"
                    id="adjacente"
                    name="adjacente"
                    value={formData.adjacente}
                    onChange={handleInputChange}
                    placeholder="Ex: 5"
                    step="any"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="oposto">Cateto Oposto</Form.Label>
                  <Form.Control
                    type="number"
                    id="oposto"
                    name="oposto"
                    value={formData.oposto}
                    onChange={handleInputChange}
                    placeholder="Ex: 3"
                    step="any"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hipotenusa">Hipotenusa</Form.Label>
                  <Form.Control
                    type="number"
                    id="hipotenusa"
                    name="hipotenusa"
                    value={formData.hipotenusa}
                    onChange={handleInputChange}
                    placeholder="Ex: 5.83"
                    step="any"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" className="btn-custom">
                🧮 Calcular
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
              <h5 className="text-primary mb-3">📊 Resultado</h5>
              <p className="fw-bold">{resultado.resultado}</p>

              {resultado.passos.length > 0 && (
                <div className="mt-3">
                  <h6 className="text-success mb-2">📝 Passos do Cálculo:</h6>
                  <div className="passos-container">
                    {(() => {
                      const secoes = [];
                      let secaoAtual = [];
                      let tituloSecao = "";

                      for (let i = 0; i < resultado.passos.length; i++) {
                        const passo = resultado.passos[i];

                        // Verificar se é um título de seção (começa com emoji)
                        if (passo.match(/^[📐🔢📊ℹ️]/)) {
                          // Se já temos uma seção em andamento, salvá-la
                          if (secaoAtual.length > 0) {
                            secoes.push({
                              titulo: tituloSecao,
                              passos: secaoAtual,
                            });
                          }

                          // Iniciar nova seção
                          tituloSecao = passo;
                          secaoAtual = [];
                        } else {
                          // Adicionar passo à seção atual
                          secaoAtual.push(passo);
                        }
                      }

                      // Adicionar a última seção
                      if (secaoAtual.length > 0) {
                        secoes.push({
                          titulo: tituloSecao,
                          passos: secaoAtual,
                        });
                      }

                      return secoes.map((secao, index) => (
                        <div key={index} className="secao-calculo mb-3">
                          <h6 className="titulo-secao mb-2">{secao.titulo}</h6>
                          <div className="passos-secao">
                            {secao.passos.map((passo, passoIndex) => {
                              // Verificar se o passo contém uma fração que precisa ser renderizada
                              const renderizarPassoComFracao = (
                                texto: string
                              ) => {
                                // Padrão para encontrar frações no formato "valor / valor"
                                const padraoFracao =
                                  /(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g;
                                const padraoFracaoComRaiz =
                                  /(\d+(?:\.\d+)?)\s*\/\s*√(\d+)/g;
                                const padraoFracaoRaiz =
                                  /√(\d+)\s*\/\s*(\d+(?:\.\d+)?)/g;

                                let resultado = texto;
                                let elementos = [];
                                let ultimoIndex = 0;

                                // Processar frações simples (ex: 3 / 2)
                                resultado = resultado.replace(
                                  padraoFracao,
                                  (match, num, den, offset) => {
                                    elementos.push(
                                      texto.slice(ultimoIndex, offset)
                                    );
                                    elementos.push(
                                      <Fracao
                                        key={`frac-${offset}`}
                                        numerador={num}
                                        denominador={den}
                                      />
                                    );
                                    ultimoIndex = offset + match.length;
                                    return "";
                                  }
                                );

                                // Processar frações com raiz no denominador (ex: 3 / √3)
                                resultado = resultado.replace(
                                  padraoFracaoComRaiz,
                                  (match, num, raiz, offset) => {
                                    elementos.push(
                                      texto.slice(ultimoIndex, offset)
                                    );
                                    elementos.push(
                                      <Fracao
                                        key={`frac-raiz-${offset}`}
                                        numerador={num}
                                        denominador={`√${raiz}`}
                                      />
                                    );
                                    ultimoIndex = offset + match.length;
                                    return "";
                                  }
                                );

                                // Processar frações com raiz no numerador (ex: √3 / 2)
                                resultado = resultado.replace(
                                  padraoFracaoRaiz,
                                  (match, raiz, den, offset) => {
                                    elementos.push(
                                      texto.slice(ultimoIndex, offset)
                                    );
                                    elementos.push(
                                      <Fracao
                                        key={`frac-raiz-num-${offset}`}
                                        numerador={`√${raiz}`}
                                        denominador={den}
                                      />
                                    );
                                    ultimoIndex = offset + match.length;
                                    return "";
                                  }
                                );

                                // Adicionar o resto do texto
                                if (ultimoIndex < texto.length) {
                                  elementos.push(texto.slice(ultimoIndex));
                                }

                                return elementos.length > 0 ? elementos : texto;
                              };

                              return (
                                <div key={passoIndex} className="passo-calculo">
                                  {renderizarPassoComFracao(passo)}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* Resumo visual dos resultados */}
              {resultado.resultado.includes("✅") && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="text-info mb-2">📐 Resumo do Triângulo:</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="d-flex justify-content-between">
                        <span>Ângulo α:</span>
                        <strong className="text-primary">
                          {resultado.passos
                            .find((p) => p.includes("Ângulo α ="))
                            ?.split("=")[1]
                            ?.trim() || "N/A"}
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Ângulo β:</span>
                        <strong className="text-primary">
                          {resultado.passos
                            .find((p) => p.includes("Ângulo β ="))
                            ?.split("=")[1]
                            ?.trim() || "N/A"}
                        </strong>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-content-between">
                        <span>Adjacente:</span>
                        <strong className="text-success">
                          {resultado.passos
                            .find((p) => p.includes("Cateto Adjacente ="))
                            ?.split("=")[1]
                            ?.trim() || "N/A"}
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Oposto:</span>
                        <strong className="text-success">
                          {resultado.passos
                            .find((p) => p.includes("Cateto Oposto ="))
                            ?.split("=")[1]
                            ?.trim() || "N/A"}
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Hipotenusa:</span>
                        <strong className="text-success">
                          {resultado.passos
                            .find((p) => p.includes("Hipotenusa ="))
                            ?.split("=")[1]
                            ?.trim() || "N/A"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Informações adicionais */}
      <Card className="mt-4">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">ℹ️ Informações</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>📐 Fórmulas Utilizadas:</h6>
              <ul className="list-unstyled">
                <li>• Seno: sin(θ) = oposto / hipotenusa</li>
                <li>• Cosseno: cos(θ) = adjacente / hipotenusa</li>
                <li>• Tangente: tg(θ) = oposto / adjacente</li>
                <li>• Pitágoras: a² + b² = c²</li>
              </ul>
            </Col>
            <Col md={6}>
              <h6>🎯 Dicas:</h6>
              <ul className="list-unstyled">
                <li>• Forneça pelo menos 2 valores</li>
                <li>• Ângulos devem estar em graus</li>
                <li>• Valores negativos não são aceitos</li>
                <li>• Use ponto para decimais</li>
                <li>• Ative frações para valores exatos</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TrianguloRetangulo;
