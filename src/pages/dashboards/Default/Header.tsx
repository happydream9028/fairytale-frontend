import React from "react";

import { Button, Col, Dropdown, Row } from "react-bootstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";

interface IHeader { 
  title: string
}

const Header: React.FC<IHeader> = ({ title = 'Dashboard'}) => {

  return (
    <Row className="mb-2 mb-xl-3">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>{title}</h3>
      </Col>

      <Col xs="auto" className="ms-auto text-end mt-n1">
          
      </Col>
    </Row>
  );
};

export default Header;
