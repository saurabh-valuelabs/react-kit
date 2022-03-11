/**
 *
 * Messages
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Card, CardHeader, CardBody } from 'reactstrap';

import { useInjectReducer } from 'utils/injectReducer';

import { useInjectSaga } from 'utils/injectSaga';

import saga from './saga';

import makeSelectMessages, {
  makeSelectMessagesLoading,
  makeSelectMessagesHasError,
  makeSelectMessagesError,
  makeSelectMessagesMeta,
  makeSelectMessagesUserMessages,
} from './selectors';

import reducer from './reducer';

import { getMessages } from './actions';

import LoadingIndicator from '../../components/LoadingIndicator';
import CustomTable from '../../components/CustomTable/Loadable';

export function Messages({
  meta,
  userMessages,
  dDefaultAction,
  isLoading,
  hasError,
  error,
}) {
  useInjectReducer({ key: 'messages', reducer });
  useInjectSaga({ key: 'messages', saga });
  useEffect(() => {
    dDefaultAction();
  }, []);
  return (
    <>
      <Helmet>
        <title>{meta.metaTitle}</title>
        <meta name="description" content={meta.metaDescription} />
      </Helmet>
      <h1>{meta.metaTitle}</h1>
      <LoadingIndicator
        actionTypeProp={dDefaultAction}
        isLoading={isLoading}
        hasError={hasError}
        error={error}
      />
      <Card>
        <CardHeader>
          <i className="fab fa-fort-awesome" />
          People eager for Awesome Stuff
        </CardHeader>
        <CardBody>
          <CustomTable
            tableHeaders={userMessages.header}
            tableBody={userMessages.body}
            applyClass="table-striped table-hover table-bordered"
            rowsPerPage={5}
            rowsPerPageOption={[5, 10, 15, 20]}
            initialSort={{ prop: 'username', isAscending: true }}
            onSort={userMessages.onSortFunction}
            labels={userMessages.customLabels}
          />
        </CardBody>
      </Card>
    </>
  );
}

Messages.propTypes = {
  dDefaultAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  meta: PropTypes.object.isRequired,
  userMessages: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messages: makeSelectMessages(),
  isLoading: makeSelectMessagesLoading(),
  hasError: makeSelectMessagesHasError(),
  error: makeSelectMessagesError(),
  meta: makeSelectMessagesMeta(),
  userMessages: makeSelectMessagesUserMessages(),
});

function mapDispatchToProps(dispatch) {
  return {
    dDefaultAction: () => dispatch(getMessages()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Messages);
