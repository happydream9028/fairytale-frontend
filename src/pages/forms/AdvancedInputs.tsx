import React from "react";
import InputMask from "react-input-mask";
import Select from "react-select";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ReactSelect = () => (
  <Card>
    <Card.Header>
      <Card.Title>React Select</Card.Title>
      <h6 className="card-subtitle text-muted">Select Component by react-select</h6>
    </Card.Header>
    <Card.Body>
      <Row>
        <Col lg="6">
          <Form.Group className="mb-3">
            <Form.Label>Single Select</Form.Label>
            <Select className="react-select-container" classNamePrefix="react-select" options={options} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Multi Select</Form.Label>
            <Select className="react-select-container" classNamePrefix="react-select" options={options} isMulti />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Searchable Select</Form.Label>
            <Select className="react-select-container" classNamePrefix="react-select" options={options} isSearchable />
          </Form.Group>
        </Col>
        <Col lg="6">
          <Form.Group className="mb-3">
            <Form.Label>Clearable Select</Form.Label>
            <Select className="react-select-container" classNamePrefix="react-select" options={options} isClearable />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loading Select</Form.Label>
            <Select className="react-select-container" classNamePrefix="react-select" options={options} isLoading />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Disabled Select</Form.Label>
            <Select className="react-select-container" classNamePrefix="react-select" options={options} isDisabled />
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const InputMasks = () => (
  <Card>
    <Card.Header>
      <Card.Title>Input Masks</Card.Title>
      <h6 className="card-subtitle text-muted">Input masks by react-input-mask</h6>
    </Card.Header>
    <Card.Body>
      <Row></Row>
    </Card.Body>
  </Card>
);

const AdvancedInputs = () => (
  <React.Fragment>
    <Helmet title="Advanced Inputs" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Advanced Inputs</h1>

      <ReactSelect />
      <InputMasks />
    </Container>
  </React.Fragment>
);

export default AdvancedInputs;
