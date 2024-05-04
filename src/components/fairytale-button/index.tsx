import { Button } from "react-bootstrap";
import React from "react";

interface IButtonComponentProps {
  name: string;
  disabled: boolean;
  butttonLabel: string;
  type: "button" | "submit" | "reset";
}
const FairyTaleButton: React.FC<IButtonComponentProps> = ({ name, disabled, butttonLabel, type }) => {
  return (
    <Button type={type} className="p-2 w-100" data-cy={`${name}-submit`} disabled={disabled}>
      {butttonLabel}
    </Button>
  );
};

export default FairyTaleButton;
