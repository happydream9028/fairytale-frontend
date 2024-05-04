import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface IModalProps {
  showModal: boolean;
  onHideModal?: () => void;
  name: string;
  fullscreen?: string | true | undefined;
  dialogClassName?: string;
  modalHeading?: string;
  modalMessage?: string;
  onClickNegativeButton?: (event: React.FormEvent<HTMLButtonElement>) => void;
  onClickPositveButton?: (event: React.FormEvent<HTMLButtonElement>) => void;
  modalButtonTextNegative?: string;
  modalButtonTextPositive?: string;
  size?: "lg" | "sm";
  dialog?: boolean;
  children?: React.ReactNode;
}

const FairytaleModalFullscreen: React.FC<IModalProps> = (props) => {
  const {
    showModal,
    onHideModal,
    name,
    fullscreen,
    dialogClassName,
    modalHeading,
    modalMessage,
    onClickNegativeButton,
    onClickPositveButton,
    modalButtonTextNegative,
    modalButtonTextPositive,
    children,
  } = props;
  return (
    <Modal
      show={showModal}
      onHide={onHideModal}
      backdrop="static"
      data-cy={`fairytale-modal-${name}`}
      keyboard={true}
      aria-labelledby="FairytaleModal"
      centered
      animation={false}
      fullscreen={fullscreen}
      dialogClassName={dialogClassName ? dialogClassName : "fairytale-modal mx-auto"}
    >
      {children ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body data-cy="apps-delete-modal-body">{children}</Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body data-cy="apps-delete-modal-body">{modalMessage}</Modal.Body>
          {modalButtonTextNegative && modalButtonTextPositive ? (
            <Modal.Footer>
              <Button
                variant="outline-primary"
                onClick={onClickNegativeButton}
                data-cy={`fairytale-modal-${name}-negative-button`}
              >
                {modalButtonTextNegative}
              </Button>
              <Button
                variant="primary"
                onClick={onClickPositveButton}
                data-cy={`fairytale-modal-${name}-positive-button`}
              >
                {modalButtonTextPositive}
              </Button>
            </Modal.Footer>
          ) : null}
        </>
      )}
    </Modal>
  );
};

const FairytaleModalDynamic: React.FC<IModalProps> = (props) => {
  const {
    showModal,
    onHideModal,
    name,
    dialogClassName,
    modalHeading,
    modalMessage,
    onClickNegativeButton,
    onClickPositveButton,
    modalButtonTextNegative,
    modalButtonTextPositive,
    size,
    children,
  } = props;
  return (
    <Modal
      show={showModal}
      onHide={onHideModal}
      data-cy={`fairytale-modal-${name}`}
      keyboard={true}
      aria-labelledby="FairytaleModal"
      centered
      size={size}
      dialogClassName={dialogClassName}
    >
      {children ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body data-cy="apps-delete-modal-body">{children}</Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body data-cy="apps-delete-modal-body">{modalMessage}</Modal.Body>
          <Modal.Footer>
            {onClickNegativeButton && modalButtonTextNegative ? (
              <Button
                variant="outline-primary"
                onClick={onClickNegativeButton}
                data-cy={`fairytale-modal-${name}-negative-button`}
              >
                {modalButtonTextNegative}
              </Button>
            ) : null}
            <Button
              variant="primary"
              onClick={onClickPositveButton}
              data-cy={`fairytale-modal-${name}-positive-button`}
            >
              {modalButtonTextPositive}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

const FairytaleModalDialog: React.FC<IModalProps> = (props) => {
  const { name, modalHeading, modalMessage, size, children } = props;
  return (
    <Modal.Dialog data-cy={`fairytale-modal-${name}`} aria-labelledby="FairytaleModal" centered size={size}>
      {children ? (
        children
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{modalHeading}</Modal.Title>
          </Modal.Header>
          <Modal.Body data-cy="apps-delete-modal-body">{modalMessage}</Modal.Body>
        </>
      )}
    </Modal.Dialog>
  );
};

const FairytaleModal: React.FC<IModalProps> = (props) => {
  const DynamicallyRenderModal = () => {
    if (!props.fullscreen) {
      return <FairytaleModalDynamic {...props} />;
    } else if (props.dialog) {
      return <FairytaleModalDialog {...props} />;
    } else {
      return <FairytaleModalFullscreen {...props} />;
    }
  };
  return <React.Fragment>{DynamicallyRenderModal()}</React.Fragment>;
};

export default FairytaleModal;
