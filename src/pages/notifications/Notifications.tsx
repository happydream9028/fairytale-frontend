import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";

import { NotyfHorizontalPosition, NotyfVerticalPosition } from "notyf";
import NotyfContext from "../../contexts/NotyfContext";

import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC1RyQq6zKMjsCO_g0anH2StNgXXZQVRwo",
  authDomain: "messagingtest-dfdf8.firebaseapp.com",
  databaseURL: "https://messagingtest-dfdf8-default-rtdb.firebaseio.com",
  projectId: "messagingtest-dfdf8",
  storageBucket: "messagingtest-dfdf8.appspot.com",
  messagingSenderId: "225777624083",
  appId: "1:225777624083:web:fcb06b79179b72ddaa8be6",
};

const app = initializeApp(firebaseConfig);

const Notifications = () => {
  const notyf = useContext(NotyfContext);
  const messaging = getMessaging(app);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("default");
  const [duration, setDuration] = useState("2500");
  const [ripple, setRipple] = useState(true);
  const [dismissible, setDismissible] = useState(false);
  const [positionX, setPositionX] = useState<NotyfHorizontalPosition>("right");
  const [positionY, setPositionY] = useState<NotyfVerticalPosition>("top");

  const _getToken = () => {
    // @ts-ignore
    getToken(messaging, {
      vapidKey: "BOqb1Eg8n6aGLayw-ZNDX7-P0HX8h6WvYQh2MM05x-JwwdE0ZcQa2zcGn91ah3jvKzqrY35ojA-JRTatESlSF4U",
    }).then((currentToken: any) => {
      if (currentToken) {
        console.log("Token here", currentToken);
        //Send token to server
      } else {
        //Request notification permission
      }
    });
  };
  const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.", permission);
        //_getToken();
      } else {
        console.log("Unable to get permission to notify.", permission);
      }
    });
  };

  return (
    <>
      {requestPermission()}
      <Helmet title="Notifications" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Notifications</h1>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title>Toast notifications</Card.Title>
                <h6 className="card-subtitle text-muted">
                  Notyf is a minimalistic JavaScript library for toast notifications.
                </h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="8">
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter a message"
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        className="mb-3"
                        defaultValue="default"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
                      >
                        <option value="default">Default</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration</Form.Label>
                      <Form.Select
                        className="mb-3"
                        defaultValue="5000"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDuration(e.target.value)}
                      >
                        <option value="2500">2.5s</option>
                        <option value="5000">5s</option>
                        <option value="7500">7.5s</option>
                        <option value="10000">10s</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="With ripple"
                      defaultChecked={true}
                      onChange={() => setRipple(!ripple)}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Dismissible"
                      defaultChecked={false}
                      onChange={() => setDismissible(!dismissible)}
                    />
                  </Col>
                  <Col md="4">
                    <Form.Group className="mb-3">
                      <Form.Label>Position X</Form.Label>
                      <Form.Check
                        type="radio"
                        name="positionX"
                        label="Left"
                        value="left"
                        onChange={() => setPositionX("left")}
                        checked={positionX === "left"}
                      />
                      <Form.Check
                        type="radio"
                        name="positionX"
                        label="Center"
                        value="center"
                        onChange={() => setPositionX("center")}
                        checked={positionX === "center"}
                      />
                      <Form.Check
                        type="radio"
                        name="positionX"
                        label="Right"
                        value="right"
                        onChange={() => setPositionX("right")}
                        checked={positionX === "right"}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Position Y</Form.Label>
                      <Form.Check
                        type="radio"
                        name="positionY"
                        label="Top"
                        value="top"
                        onChange={() => setPositionY("top")}
                        checked={positionY === "top"}
                      />
                      <Form.Check
                        type="radio"
                        name="positionY"
                        label="Bottom"
                        value="bottom"
                        onChange={() => setPositionY("bottom")}
                        checked={positionY === "bottom"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Button
                  onClick={() =>
                    notyf.open({
                      type,
                      message: message
                        ? message
                        : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                      duration: parseInt(duration),
                      ripple,
                      dismissible,
                      position: {
                        x: positionX,
                        y: positionY,
                      },
                    })
                  }
                >
                  Show notification
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Notifications;
