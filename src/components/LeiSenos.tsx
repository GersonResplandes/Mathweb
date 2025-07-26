import React from "react";
import { Card, Alert } from "react-bootstrap";

const LeiSenos: React.FC = () => {
  return (
    <div className="fade-in">
      <Card className="form-container">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">📏 Lei dos Senos</h4>
        </Card.Header>
        <Card.Body>
          <p className="text-muted mb-4">
            Calcule lados usando a lei dos senos.
          </p>
          <Alert variant="info">
            🚧 Esta funcionalidade está em desenvolvimento e será implementada
            em breve!
          </Alert>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeiSenos;
