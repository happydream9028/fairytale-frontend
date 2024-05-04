import React from "react";
import { Link, Outlet } from "react-router-dom";

import { Col, Container, Nav, Row } from "react-bootstrap";

import Main from "../components/Main";
import Settings from "../components/Settings";
import NavbarLanguages from "../components/navbar/NavbarLanguages";
import { useTranslation } from "react-i18next";

interface AuthProps {
  children?: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Main className="d-flex w-100 ">
        <Nav className="navbar-align">
          <NavbarLanguages />
        </Nav>
        <Container className="d-flex flex-column">
          <Row className="h-100">
            <Col sm="10" md="8" lg="6" className="mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                {children}
                <Outlet />
              </div>
            </Col>
          </Row>
          <Row>
            <div className="text-center mt-4">
              <small>
                <Link to="privacy">{t("privacy")}</Link>
              </small>
            </div>
          </Row>
        </Container>
      </Main>
      {/* <Settings /> */}
    </React.Fragment>
  );
};

export default Auth;
