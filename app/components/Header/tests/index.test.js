/**
 *
 * Tests for Header
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import nav from '../../../config/_nav';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Header from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

jest.mock('react-router-dom', () => ({ Link: 'a' }));
describe('<Header />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Header nav={nav} imgSrc="" altText="" />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Header nav={nav} imgSrc="" altText="" />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
