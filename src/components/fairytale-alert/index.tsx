import { Alert } from "react-bootstrap";
import React from "react";

interface IAlertComponentProps {
  variant?: "success" | "danger" | "light";
  message?: string;
  heading?: string;
  show: boolean;
  name?: string;
  children?: React.ReactNode;
}
const FairyTaleAlert: React.FC<IAlertComponentProps> = ({ variant, message, heading, show, name, children }) => {
  const AlertComponet = ({ children }: { children?: React.ReactNode }) => {
    return (
      <Alert variant={variant} data-cy={`${name}-alert`}>
        {children ? (
          children
        ) : (
          <div className="alert-message">
            <strong>{message}</strong>
          </div>
        )}
      </Alert>
    );
  };
  return show ? <AlertComponet children={children} /> : null;
};

export default FairyTaleAlert;
