/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, CardBody } from 'reactstrap';

import { useInjectReducer } from 'utils/injectReducer';

import { useInjectSaga } from 'utils/injectSaga';

import saga from './saga';

import makeSelectDashboard, {
  makeSelectDashboardLoading,
  makeSelectDashboardHasError,
  makeSelectDashboardError,
  makeSelectDashboardMetaTitle,
  makeSelectDashboardMetaDescription,
} from './selectors';

import reducer from './reducer';

import { defaultAction } from './actions';

export function Dashboard({ metaTitle, metaDescription }) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <Row>
        <Col>
          <h1 className="pt-3">{metaTitle}</h1>
          <Card className="my-3">
            <CardBody>
              Welcome User,This is the your dashboard. This will be filled based
              on your preference.{' '}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

Dashboard.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  isLoading: makeSelectDashboardLoading(),
  hasError: makeSelectDashboardHasError(),
  error: makeSelectDashboardError(),
  metaTitle: makeSelectDashboardMetaTitle(),
  metaDescription: makeSelectDashboardMetaDescription(),
});

function mapDispatchToProps(dispatch) {
  return {
    dDefaultAction: () => dispatch(defaultAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Dashboard);
