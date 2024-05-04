/*
 * Search/Filter component for [FairyTaleTable]
 * */
import React from "react";

import { Form } from "react-bootstrap";

interface ISelectFilterComponentProps {
  options: Array<ISelectOption>;
  onChangeSelect: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface ISelectOption {
  value?: string;
  label?: string;
}

const SelectFilter = ({ options, onChangeSelect }: ISelectFilterComponentProps) => {
  return (
    <React.Fragment>
      <Form.Select data-cy={`app-form-filter-input`} name="input" onChange={onChangeSelect}>
        {options.map((option, IDX) => (
          <option key={IDX} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </React.Fragment>
  );
};

export default SelectFilter;
