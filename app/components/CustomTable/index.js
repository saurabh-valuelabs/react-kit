/**
 * This is a story for an extended table.
 * If you want to personally customize how the table looks, like the positioning of filters/pagination, you can do it here.
 * You will need to import the components and apply them in the render function.
 * If you are about to extend your table, do not forget to wrap it with memo.
 */
import React from 'react';
// import PropTypes from 'prop-types';
import './index.scss';

import {
  Pagination,
  TableHeader,
  TableBody,
  Filter,
  useDatatableLifecycle,
  shouldTableUpdate,
} from 'react-bs-datatable';

import { Row, Col, Table } from 'reactstrap';

function CustomTable(props) {
  const {
    data,
    tableHeaders,
    onChangeFilter,
    onPageNavigate,
    classes,
    onSortChange,
    tableClass,
    labels,
    filterable,
    filterText,
    rowsPerPage,
    currentPage,
    sortedProp,
    maxPage,
    Components,
  } = useDatatableLifecycle(props);

  return (
    <>
      <Row className="my-3 pr-hide">
        <Col xs="12" md="3">
          <Filter
            classes={classes}
            tableHeaders={tableHeaders}
            placeholder={labels.filterPlaceholder}
            onChangeFilter={onChangeFilter}
            filterText={filterText}
            filterable={filterable}
            components={{
              Adornment: Components.Adornment,
              Button: Components.Button,
              ClearIcon: Components.ClearIcon,
              FormControl: Components.FormControl,
              InputGroup: Components.InputGroup,
            }}
          />
        </Col>
        <Col xs={12} md />
        <Col xs={12} md="auto">
          <Pagination
            classes={classes}
            data={data}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageNavigate={onPageNavigate}
            labels={labels}
            maxPage={maxPage}
            components={{
              Button: Components.Button,
              ButtonGroup: Components.ButtonGroup,
            }}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs="12">
          <Table className={tableClass}>
            <TableHeader
              classes={classes}
              tableHeaders={tableHeaders}
              sortedProp={sortedProp}
              onSortChange={onSortChange}
              components={{
                TableHead: Components.TableHead,
                TableCell: Components.TableCell,
                TableRow: Components.TableRow,
              }}
            />
            <TableBody
              classes={classes}
              tableHeaders={tableHeaders}
              labels={labels}
              data={data}
              components={{
                TableBody: Components.TableBody,
                TableCell: Components.TableCell,
                TableRow: Components.TableRow,
              }}
            />
          </Table>
        </Col>
      </Row>
    </>
  );
}

CustomTable.propTypes = {};

export default React.memo(CustomTable, shouldTableUpdate);
