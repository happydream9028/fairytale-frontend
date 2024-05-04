import React from "react";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Briefcase, Home, Link, MapPin, MessageSquare } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import avatar4 from "./avatar.jpg";
import { useTranslation } from "react-i18next";
import { IUser } from "../types/user";

interface IUserDetailProps {
  user: IUser;
}

const FairytaleUserProfile: React.FC<IUserDetailProps> = ({ user }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">{tpagetexts("userProfileHeader")}</Card.Title>
              </Card.Header>
              <Card.Body className="text-center">
                {/*<img src="" alt="Stacie Hall"
                                     className="img-fluid rounded-circle mb-2" width="128"
                                     height="128"/>*/}
                <Card.Title className="mb-0">{`${user.first_name} ${user.last_name}`}</Card.Title>
                <div className="text-muted mb-2"></div>
              </Card.Body>

              <hr className="my-0" />

              <Card.Body>
                <Card.Title>{tpagetexts("userProfileSkills")}</Card.Title>
                <Badge bg="primary" className="me-2 my-1">
                  HTML
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  JavaScript
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  Sass
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  Angular
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  Vue
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  React
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  Redux
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  UI
                </Badge>
                <Badge bg="primary" className="me-2 my-1">
                  UX
                </Badge>
              </Card.Body>

              <hr className="my-0" />
              <Card.Body>
                <Card.Title>{tpagetexts("userProfileAbout")}</Card.Title>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <Home width={14} height={14} className="me-1" /> Lives in Finland
                  </li>

                  <li className="mb-1">
                    <Briefcase width={14} height={14} className="me-1" /> Works at Fairytale Oy
                  </li>
                  <li className="mb-1">
                    <MapPin width={14} height={14} className="me-1" /> From Helsinki
                  </li>
                  <li className="mb-1">
                    <Briefcase width={14} height={14} className="me-1" />
                    {`Email address is ${user.email}`}
                  </li>
                </ul>
              </Card.Body>
              <hr className="my-0" />
              <Card.Body>
                <Card.Title>Elsewhere</Card.Title>

                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <FontAwesomeIcon icon={faGlobe} fixedWidth className="me-1" />
                    <Link to="/dashboard/default">staciehall.co</Link>
                  </li>
                  <li className="mb-1">
                    <FontAwesomeIcon icon={faTwitter} fixedWidth className="me-1" />
                    <Link to="/dashboard/default">Twitter</Link>
                  </li>
                  <li className="mb-1">
                    <FontAwesomeIcon icon={faFacebook} fixedWidth className="me-1" />
                    <Link to="/dashboard/default">Facebook</Link>
                  </li>
                  <li className="mb-1">
                    <FontAwesomeIcon icon={faInstagram} fixedWidth className="me-1" />
                    <Link to="/dashboard/default">Instagram</Link>
                  </li>
                  <li className="mb-1">
                    <FontAwesomeIcon icon={faLinkedin} fixedWidth className="me-1" />
                    <Link to="/dashboard/default">LinkedIn</Link>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FairytaleUserProfile;
