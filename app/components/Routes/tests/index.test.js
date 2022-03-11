/**
 *
 * Tests for Routes
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Routes from '../index';
import passedRoutes from '../../../config/_routes';
import { DEFAULT_LOCALE } from '../../../i18n';

jest.mock('react-router-dom', () => ({
  Link: 'a',
  Route: ({ children }) =>
    typeof children === 'function' ? children({ match: false }) : 'div',
  Switch: ({ children }) =>
    typeof children === 'function' ? children({ match: false }) : 'div',
}));

describe('<Routes />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Routes routes={passedRoutes} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Routes routes={passedRoutes} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
