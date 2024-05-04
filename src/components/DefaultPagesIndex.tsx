import React, { ChangeEventHandler, useState } from "react";

import { Helmet } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
import DataError from "../components/DataError";

import { useTranslation } from "react-i18next";

const FairytaleDefaultPage = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<boolean>(false);

  const tableColumns = [
    {
      Header: "default",
      accessor: "default",
    },
    {
      Header: "default",
      accessor: "default",
    },
    {
      Header: "default",
      accessor: "default",
    },
  ];
  if (error) {
    return <DataError />;
  }
  return (
    <React.Fragment>
      <Helmet title="Fairytale default index for pages" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3" data-cy="">
          Default Index for Pages
        </h1>
        <Row>
          <Col>Default Index for Pages</Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FairytaleDefaultPage;
