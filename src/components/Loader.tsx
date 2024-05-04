import React from "react";
import { Row, Spinner } from "react-bootstrap";

const Loader: React.FC = () => (
  <Row className="justify-content-center align-self-center w-100 text-center bg-transparent">
    <Spinner animation="border" role="status" />
  </Row>
);

export default Loader;
