/**
 *
 * Tests for App
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { App } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

import nav from '../../../config/_nav';
import routes from '../../../config/_routes';

jest.mock('react-router-dom', () => ({
  Link: 'a',
  Route: ({ children }) =>
    typeof children === 'function' ? children({ match: false }) : 'div',
  Switch: ({ children }) =>
    typeof children === 'function' ? children({ match: false }) : 'div',
}));

describe('<App />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <App
            dispatch={dispatch}
            dGetAppDetail={jest.fn()}
            isLoading={false}
            hasError={false}
            error=""
            meta={{}}
            headerBlock={{
              logoSrc: '',
              logoAltText: 'NepalFranchise',
              headerNavList: nav,
            }}
            passedRoutes={routes}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(true);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <App
            dGetAppDetail={jest.fn()}
            isLoading={false}
            hasError={false}
            error=""
            meta={{}}
            headerBlock={{
              logoSrc: '',
              logoAltText: 'NepalFranchise',
              headerNavList: nav,
            }}
            passedRoutes={routes}
          />
        </IntlProvider>
      </Provider>,
    );

    expect(firstChild).toMatchSnapshot();
  });
});
