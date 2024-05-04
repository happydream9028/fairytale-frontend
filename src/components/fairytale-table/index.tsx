import React from "react";
import {
  useTable,
  usePagination,
  TableOptions,
  useSortBy,
  useGlobalFilter,
  useResizeColumns,
  useFlexLayout,
} from "react-table";

import { Card, Table, Pagination, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";

import { useTranslation } from "react-i18next";
import FairyTaleDataEmpty from "../fairytale-data-empty";

interface ITableOptions {
  showHeader?: boolean;
  mainTitle?: string;
  subtitle?: string;
  useSearchFilter?: boolean;
  selectOptions?: { label: string; value: string }[];
  onChangeSelect?: any;
  children?: React.ReactElement;
  onClickTableRow?: any;
}

const RenderTableFilterComponent = ({
  useSearchFilter,
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
  onChangeSelect,
  selectOptions,
}: {
  useSearchFilter?: boolean;
  preGlobalFilteredRows: any;
  setGlobalFilter: any;
  globalFilter: any;
  onChangeSelect: any;
  selectOptions: any;
}) => {
  if (useSearchFilter === true) {
    return (
      <SearchFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
    );
  } else if (useSearchFilter === false) {
    return (
      <div className="w-50 pt-0 pb-3 mx-auto">
        <SelectFilter onChangeSelect={onChangeSelect} options={selectOptions} />
      </div>
    );
  } else {
    return null;
  }
};

export const FairyTaleTable = (props: TableOptions<Record<string, any>> & ITableOptions) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);

  const {
    columns,
    data,
    showHeader,
    mainTitle,
    subtitle,
    useSearchFilter,
    selectOptions = [],
    onChangeSelect,
    children,
    onClickTableRow,
    onClickAdd
  } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      defaultCanSort: false,
      initialState: {
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useResizeColumns,
    useFlexLayout
  );

  return (
    <Card>
      {showHeader ? (
        <Card.Header data-cy="pagination-table-page-title">
          <Card.Title>{tpagetexts(`${mainTitle}`)}</Card.Title>
          <h6 className="card-subtitle text-muted" data-cy="app-table-sub-heading-text">
            {tpagetexts(`${subtitle}`)}
          </h6>
        </Card.Header>
      ) : null}
      <Card.Body>
        <RenderTableFilterComponent
          useSearchFilter={useSearchFilter}
          setGlobalFilter={setGlobalFilter}
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          onChangeSelect={onChangeSelect}
          selectOptions={selectOptions}
        />
        {onClickAdd ? <Button  className='mb-2' size="lg" variant="outline-primary" onClick={onClickAdd}>
            Add New Partner
          </Button> : null}
        <Table responsive striped bordered {...getTableProps()} data-cy="pagination-table-main">
          <thead data-cy="pagination-table-head">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {tpagetexts(`${column.render("Header")}`)}
                      {column.id === "actions" ||  column.disableSortBy === false ? null : (
                        <span className="cursor-pointer" data-cy="apps-list-actions-span">
                          {column.isSorted === true ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon icon={faSortUp} className="ms-2 cursor-pointer" />
                            ) : (
                              <FontAwesomeIcon icon={faSortDown} className="ms-2 cursor-pointer" />
                            )
                          ) : (
                            <FontAwesomeIcon icon={faSort} className="ms-2" />
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} data-cy="pagination-table-body">
            {page.map((row: any, i: any) => { 
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  data-cy="pagination-table-row"
                  onClick={ onClickTableRow ? (event) => onClickTableRow(row, event) : null}
                  className="cursor-pointer"
                >
                  {row.cells.map((cell: any, idx: number) => { 
                    const cellProps = cell.getCellProps({
                      className: cell.column.id === 'actions' || cell.column.id === 'actions_move' ? 'action-cell' : ''
                    });
                    return (
                      <td {...cellProps} data-cy={`pagination-table-data-${idx}`}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {data.length <= pageSize ? null : (
          <Row>
            <Col md="6">
              <span className="mx-2">
                {tcommon(`page`)}{" "}
                <strong>
                  {pageIndex + 1} {tcommon(`of`)} {pageOptions.length}
                </strong>
              </span>
              <span className="ms-3 me-2">{tcommon(`show`)}</span>
              <Form.Select
                className="d-inline-block w-auto"
                value={pageSize}
                onChange={(e: any) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Form.Select>

              <span className="ms-3 me-2">{tcommon(`goToPage`)}</span>
              <Form.Control
                className="d-inline-block"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "75px" }}
              />
            </Col>
            <Col md="6">
              <Pagination className="float-end">
                <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
        <>
          {children ? children : null}
          {data.length === 0 ? <FairyTaleDataEmpty /> : null}
        </>
      </Card.Body>
    </Card>
  );
};

export default FairyTaleTable;
