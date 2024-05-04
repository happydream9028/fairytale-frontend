import React from "react";
import { Container, Row } from "react-bootstrap";
import personDigging from "../assets/img/person-digging-solid.svg";

const DataError = () => (
  <Container fluid className="d-flex" data-cy="apps-error-container">
    <Row className="justify-content-center align-self-center w-100 text-center">
      <img src={personDigging} style={{ width: "5rem" }} className="mb-2" alt="Data Error" />
      <p>Oops! Something went wrong! please reload or try again later.</p>
    </Row>
  </Container>
);

export default DataError;
