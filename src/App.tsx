import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Componentes que vamos criar
import TrianguloRetangulo from "./components/TrianguloRetangulo";
import LeiCossenos from "./components/LeiCossenos";
import LeiSenos from "./components/LeiSenos";
import ConversorTemperatura from "./components/ConversorTemperatura";
import FuncaoSegundoGrau from "./components/FuncaoSegundoGrau";
import ExpressaoMatematica from "./components/ExpressaoMatematica";

// Tipos
import { ComponenteCalculadora } from "./types";

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [componenteAtivo, setComponenteAtivo] = useState<string>("home");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const componentes: { [key: string]: ComponenteCalculadora } = {
    triangulo: {
      titulo: "Triângulo Retângulo",
      descricao: "Calcule lados e ângulos usando trigonometria",
      icone: "📐",
      componente: TrianguloRetangulo,
    },
    leiCossenos: {
      titulo: "Lei dos Cossenos",
      descricao: "Resolva triângulos usando a lei dos cossenos",
      icone: "🔺",
      componente: LeiCossenos,
    },
    leiSenos: {
      titulo: "Lei dos Senos",
      descricao: "Calcule lados usando a lei dos senos",
      icone: "📏",
      componente: LeiSenos,
    },
    temperatura: {
      titulo: "Conversor de Temperatura",
      descricao: "Converta entre Celsius, Fahrenheit e Kelvin",
      icone: "🌡️",
      componente: ConversorTemperatura,
    },
    funcaoSegundoGrau: {
      titulo: "Função do Segundo Grau",
      descricao: "Calcule raízes e vértice de funções quadráticas",
      icone: "📊",
      componente: FuncaoSegundoGrau,
    },
    expressao: {
      titulo: "Expressão Matemática",
      descricao: "Avalie expressões matemáticas complexas",
      icone: "🧮",
      componente: ExpressaoMatematica,
    },
  };

  const renderizarComponente = () => {
    if (componenteAtivo === "home") {
      return (
        <div className="text-center">
          <h1 className="display-4 mb-4">🧮 MathWeb</h1>
          <p className="lead mb-5">
            Calculadora completa de matemática com trigonometria, funções e
            conversores
          </p>

          <Row className="g-4">
            {Object.entries(componentes).map(([key, comp]) => (
              <Col key={key} xs={12} sm={6} lg={4}>
                <Card
                  className="h-100 shadow-sm hover-card"
                  onClick={() => setComponenteAtivo(key)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="text-center">
                    <div className="display-4 mb-3">{comp.icone}</div>
                    <Card.Title>{comp.titulo}</Card.Title>
                    <Card.Text className="text-muted">
                      {comp.descricao}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    const ComponenteSelecionado = componentes[componenteAtivo]?.componente;
    return ComponenteSelecionado ? <ComponenteSelecionado /> : null;
  };

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#" onClick={() => setComponenteAtivo("home")}>
            🧮 MathWeb
          </Navbar.Brand>

          {/* Botão do menu para mobile */}
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-lg"
            onClick={handleShow}
          />

          {/* Menu lateral */}
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Menu MathWeb
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  onClick={() => {
                    setComponenteAtivo("home");
                    handleClose();
                  }}
                  active={componenteAtivo === "home"}
                >
                  🏠 Início
                </Nav.Link>
                {Object.entries(componentes).map(([key, comp]) => (
                  <Nav.Link
                    key={key}
                    onClick={() => {
                      setComponenteAtivo(key);
                      handleClose();
                    }}
                    active={componenteAtivo === key}
                  >
                    {comp.icone} {comp.titulo}
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Conteúdo principal */}
      <Container className="py-4">
        {componenteAtivo !== "home" && (
          <div className="mb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => setComponenteAtivo("home")}
            >
              ← Voltar ao Início
            </button>
            <h2 className="mt-3">
              {componentes[componenteAtivo]?.icone}{" "}
              {componentes[componenteAtivo]?.titulo}
            </h2>
            <p className="text-muted">
              {componentes[componenteAtivo]?.descricao}
            </p>
          </div>
        )}

        {renderizarComponente()}
      </Container>

      {/* Footer */}
      <footer className="bg-white text-center py-4 mt-5 border-top">
        <Container>
          <p className="text-muted mb-0">
            © 2024 MathWeb - Calculadora Matemática Completa
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default App;
