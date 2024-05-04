/*
 * Search/Filter component for [FairyTaleTable]
 * */
import React, { useState } from "react";

import { Container, Form } from "react-bootstrap";
import { useAsyncDebounce } from "react-table";
import { useTranslation } from "react-i18next";

/*TODO: find appropriate types fro these props*/
interface ISearchFilterComponentProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}

const SearchFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: ISearchFilterComponentProps) => {
  const { t } = useTranslation();
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChangeDebounced = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  return (
    <React.Fragment>
      <Container fluid className="pt-0 pb-5">
        <Form.Control
          type="text"
          className="w-50 mx-auto"
          data-cy={`app-form-filter-input`}
          name="input"
          placeholder={`${t("searchFrom")} ${count} ${t("records")}`}
          value={value || ""}
          onChange={(event) => {
            setValue(event.target.value);
            onChangeDebounced(event.target.value);
          }}
        />
      </Container>
    </React.Fragment>
  );
};

export default SearchFilter;
