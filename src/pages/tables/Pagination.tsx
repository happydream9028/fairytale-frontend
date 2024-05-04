import React from "react";
import { Helmet } from "react-helmet-async";
import { useTable, usePagination, TableOptions, useSortBy, useGlobalFilter } from "react-table";
import { useTranslation } from "react-i18next";

import { Card, Container, Table, Pagination, Row, Col, Form } from "react-bootstrap";

import { tableData, tableColumns } from "./data";
import { Edit2, Trash } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import SearchFilter from "../../components/fairytale-table/SearchFilter";

const tableActionsHooks = (hooks: any) => {
  hooks.visibleColumns.push((columns: any) => [
    ...columns,
    {
      id: "actions",
      Header: "Actions",
      Cell: ({ row }: { row: any }) => (
        <span>
          <Edit2
            className="align-middle me-1 cursor-pointer"
            size={18}
            onClick={() => console.log("Row values - edit", row.values)}
          />
          <Trash
            className="align-middle cursor-pointer"
            size={18}
            onClick={() => console.log("Row values - edit", row.values)}
          />
        </span>
      ),
    },
  ]);
};

export const PaginationTable = (props: TableOptions<Record<string, unknown>>) => {
  const { t } = useTranslation();
  const { columns, data, showHeader, mainTitle, subtitle } = props;

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
      defaultCanSort: true,
      initialState: {
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    tableActionsHooks,
    useSortBy,
    usePagination
  );

  return (
    <Card>
      {showHeader ? (
        <Card.Header data-cy="pagination-table-page-title">
          <Card.Title>{t(`${mainTitle}`)}</Card.Title>
          <h6 className="card-subtitle text-muted">{t(`${subtitle}`)}</h6>
        </Card.Header>
      ) : null}
      <Card.Body>
        <SearchFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <Table striped bordered {...getTableProps()} data-cy="pagination-table-main">
          <thead data-cy="pagination-table-head">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {t(`${column.render("Header")}`)}
                      {column.id === "actions" ? null : (
                        <span className="cursor-pointer">
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
                <tr {...row.getRowProps()} data-cy="pagination-table-row">
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()} data-cy="pagination-table-data">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Row>
          <Col md="6">
            <span className="mx-2">
              {t(`page`)}{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span className="ms-3 me-2">{t(`show`)}</span>
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

            <span className="ms-3 me-2">{t(`goToPage`)}</span>
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
      </Card.Body>
    </Card>
  );
};

const PaginationPage = () => (
  <React.Fragment>
    <Helmet title="Pagination" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Pagination</h1>

      <PaginationTable columns={tableColumns} data={tableData} />
    </Container>
  </React.Fragment>
);

export default PaginationPage;
