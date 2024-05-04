import React, { ChangeEventHandler } from "react";
import Offcanvas, { OffcanvasPlacement } from "react-bootstrap/Offcanvas";

interface OffcanvasProps {
  show: boolean;
  handleClose: ChangeEventHandler<undefined>;
  children?: React.ReactNode;
  title: string;
  placement: OffcanvasPlacement;
}

const AppOffcanvas: React.FC<OffcanvasProps> = ({ show, handleClose, children, title, placement }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} backdrop="static" placement={placement} data-cy={`app-offcanvas`}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title data-cy={`app-offcanvas-heading-title`}>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppOffcanvas;
