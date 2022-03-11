/**
 *
 * List
 *
 */

import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import { Card, CardBody } from 'reactstrap';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import { getList } from './actions';
import { makeSelectListLoading, makeSelectListList } from './selectors';

import { pageSetupInfo } from '../../config/_pageCreateEditDetail';

import LoadingIndicator from '../../components/LoadingIndicator';
import CustomTable from '../../components/CustomTable/Loadable';

export function List({ moduleCode, dGetList, isLoading, list }) {
  const { meta, fieldName, apiUrl, tableConfig } = pageSetupInfo[
    moduleCode
  ].list;
  useInjectReducer({ key: 'list', reducer });
  useInjectSaga({ key: 'list', saga });
  useEffect(() => {
    dGetList(fieldName, apiUrl);
  }, [moduleCode]);
  return (
    <>
      <Helmet>
        <title>{meta.metaTitle}</title>
        <meta name="description" content={meta.metaDescription} />
      </Helmet>
      <LoadingIndicator isLoading={isLoading} />
      <h1 className="pt-3">{meta.metaTitle}</h1>
      {!isLoading && (
        <Card className="my-3">
          {/* <CardHeader>
            <i className="fab fa-fort-awesome" />
            {meta.metaTitle}
          </CardHeader> */}
          <CardBody>
            <CustomTable
              tableHeaders={tableConfig.header}
              tableBody={list[fieldName]}
              classes={tableConfig.classes}
              rowsPerPage={tableConfig.rowsPerPage}
              initialSort={tableConfig.initialSort}
              onSort={tableConfig.onSortFunction}
              labels={tableConfig.customLabels}
              rowsPerPageOption={[5, 10, 15, 20]}
            />
          </CardBody>
        </Card>
      )}
    </>
  );
}

List.propTypes = {
  moduleCode: PropTypes.string.isRequired,
  dGetList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectListLoading(),
  list: makeSelectListList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dGetList: (fieldName, apiUrl) => dispatch(getList(fieldName, apiUrl)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(List);
