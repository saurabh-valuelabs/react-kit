/**
 *
 * App
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Container, Button } from 'reactstrap';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import headerNav from 'config/_nav';
import routes from 'config/_routes';

import { useInjectReducer } from 'utils/injectReducer';

import { useInjectSaga } from 'utils/injectSaga';

import {
  meta,
  headerBlock,
  formFields,
  formName,
  path,
} from './internalConfig';

import {
  selectAppIsLoading,
  selectAppIsLogin,
  selectAppUserProfile,
  selectAppFormsValue,
  selectAppFormsValid,
  selectAppFormsReadOnly,
  selectAppTypeAheadOptions,
  selectAppFieldFetched,
} from './selectors';

import reducer from './reducer';

import saga from './saga';

import {
  getLoginStatus,
  inputHandler,
  formSubmit,
  loginHandler,
  logoutHandler,
  getTypeAheadOptions,
} from './actions';

import LoadingIndicator from '../../components/LoadingIndicator';
import MetaHeader from '../../components/MetaHeader';

import Login from '../../components/Login/Loadable';

import Header from '../../components/Header';
import Routes from '../../components/Routes';
import Footer from '../../components/Footer';

export function App({
  location,
  dGetLoginStatus,
  dInputHandler,
  dFormSubmit,
  dLogoutHandler,
  dGetUsers,
  isLoading,
  isLogin,
  userProfile,
  formsValue,
  formsValid,
  formsReadonly,
  typeAheadOptions,
  fieldFetched,
}) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    dGetLoginStatus();
    if (isLogin) {
      if (typeAheadOptions.users.length === 0) {
        dGetUsers();
      }
    }
  }, [isLogin]);
  return (
    <>
      <Helmet titleTemplate={`%s - ${meta.title}`} defaultTitle={meta.title} />
      <MetaHeader meta={meta} lang={meta.lang} dir={meta.dir} />

      <ToastContainer autoClose={5000} />
      <div className="app">
        {!isLogin ? (
          <>
            <AppHeader fixed>
              <Header
                imgSrc={headerBlock.logoSrc}
                altText={headerBlock.logoAltText}
                userProfile={userProfile}
              />
            </AppHeader>
            <div className="app-body">
              <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                {userProfile && (
                  <div className="info">
                    <ul className="nav">
                      <li className="nav-item p-3">
                        Welcome {userProfile.vName}
                      </li>
                    </ul>
                  </div>
                )}
                <AppSidebarNav navConfig={headerNav} location={location} />
                <div className="scrollbar-container sidebar-nav ps ps-container ps--active-y max-height1">
                  <ul className="nav">
                    <li className="nav-item">
                      <Button
                        className="nav-link txt-left"
                        color="link"
                        block
                        onClick={dLogoutHandler}
                      >
                        <i className="nav-icon fa fa-sign-out" />
                        Logout
                        <span className="badge badge-info" />
                      </Button>
                    </li>
                  </ul>
                </div>
                <AppSidebarFooter />
                <AppSidebarMinimizer />
              </AppSidebar>
              <main className="main">
                <AppBreadcrumb appRoutes={routes} />
                <Container fluid>
                  <LoadingIndicator isLoading={isLoading} />
                  <Routes routes={routes} isLogin={isLogin} />
                </Container>
              </main>
            </div>
            <AppFooter>
              <Footer />
            </AppFooter>
          </>
        ) : (
          <>
            <LoadingIndicator isLoading={isLoading} />
            <Login
              headerBlock={headerBlock}
              inputHandler={dInputHandler}
              loginHandler={dFormSubmit}
              formFields={formFields}
              formsValue={formsValue[formName]}
              formsValid={formsValid[formName]}
              formsReadonly={formsReadonly[formName]}
              fieldFetched={fieldFetched}
            />
          </>
        )}
      </div>
    </>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  dGetLoginStatus: PropTypes.func.isRequired,
  dFormSubmit: PropTypes.func.isRequired,
  dInputHandler: PropTypes.func.isRequired,
  dLogoutHandler: PropTypes.func.isRequired,
  dGetUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  userProfile: PropTypes.object,
  formsValue: PropTypes.object.isRequired,
  formsValid: PropTypes.object.isRequired,
  formsReadonly: PropTypes.object.isRequired,
  typeAheadOptions: PropTypes.object.isRequired,
  fieldFetched: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectAppIsLoading(),
  isLogin: selectAppIsLogin(),
  userProfile: selectAppUserProfile(),
  formsValue: selectAppFormsValue(),
  formsValid: selectAppFormsValid(),
  formsReadonly: selectAppFormsReadOnly(),
  typeAheadOptions: selectAppTypeAheadOptions(),
  fieldFetched: selectAppFieldFetched(),
});

function mapDispatchToProps(dispatch) {
  return {
    dGetUsers: () => dispatch(getTypeAheadOptions('select_users', 'users')),
    dGetLoginStatus: () => dispatch(getLoginStatus()),
    dInputHandler: (fieldName, fieldValue, type) =>
      dispatch(inputHandler(formName, fieldName, fieldValue, type)),
    dFormSubmit: () => {
      dispatch(formSubmit(formName, path, loginHandler, formFields, false));
    },
    dLogoutHandler: () => dispatch(logoutHandler()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(App);
