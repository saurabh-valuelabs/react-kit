/* eslint-disable no-restricted-globals */
/**
 *
 * Routes
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Router from 'react-router-dom';

function Routes({ routes, isLogin }) {
  return (
    <>
      <main>
        <Router.Switch>
          {routes.map(route => (
            <Router.Route
              key={`route-${route.name}`}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props =>
                isLogin || !route.login ? (
                  <route.component
                    {...props}
                    name={route.name}
                    moduleCode={route.moduleCode}
                    moduleType={route.moduleType}
                  />
                ) : (
                  <>
                    <route.preLoginComponent {...props} name={route.name} />
                  </>
                )
              }
            />
          ))}
        </Router.Switch>
      </main>
    </>
  );
}

Routes.propTypes = {
  routes: PropTypes.array.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default Routes;
