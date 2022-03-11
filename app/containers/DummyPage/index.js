/**
 *
 * DummyPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';

import { useInjectSaga } from 'utils/injectSaga';

import saga from './saga';

import makeSelectDummyPage, {
  makeSelectDummyPageLoading,
  makeSelectDummyPageHasError,
  makeSelectDummyPageError,
  makeSelectDummyPageMetaTitle,
  makeSelectDummyPageMetaDescription,
} from './selectors';

import reducer from './reducer';

import { defaultAction } from './actions';

import LoadingIndicator from '../../components/LoadingIndicator';

export function DummyPage({
  metaTitle,
  metaDescription,
  dDefaultAction,
  isLoading,
  hasError,
  error,
}) {
  useInjectReducer({ key: 'dummyPage', reducer });
  useInjectSaga({ key: 'dummyPage', saga });
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <h1>{metaTitle}</h1>
      <LoadingIndicator
        actionTypeProp={dDefaultAction}
        isLoading={isLoading}
        hasError={hasError}
        error={error}
      />
    </>
  );
}

DummyPage.propTypes = {
  dDefaultAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dummyPage: makeSelectDummyPage(),
  isLoading: makeSelectDummyPageLoading(),
  hasError: makeSelectDummyPageHasError(),
  error: makeSelectDummyPageError(),
  metaTitle: makeSelectDummyPageMetaTitle(),
  metaDescription: makeSelectDummyPageMetaDescription(),
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
export default compose(
  withConnect,
  memo,
)(DummyPage);
