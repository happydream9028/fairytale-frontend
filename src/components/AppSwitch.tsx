import React from "react";
import Form from "react-bootstrap/Form";

interface Appswitch {
  checked: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  labelTextTrue?: string;
  labelTextFalse?: string;
}

const AppSwitch = ({ checked, onChange, name, labelTextTrue, labelTextFalse }: Appswitch) => {
  return (
    <Form.Switch
      type="switch"
      onChange={onChange}
      checked={checked}
      data-cy={`app-switch-${name}`}
      id="custom-switch"
      label={checked ? labelTextTrue : labelTextFalse}
    />
  );
};

export default AppSwitch;
