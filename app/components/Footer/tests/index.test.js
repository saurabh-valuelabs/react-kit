/**
 *
 * Tests for Footer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import { IntlProvider } from 'react-intl';
import footerNav from '../../../config/_footerNav';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Footer from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

jest.mock('react-router-dom', () => ({ Link: 'a' }));
describe('<Footer />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Footer nav={footerNav} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Footer nav={footerNav} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
