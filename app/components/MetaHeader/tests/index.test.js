/**
 *
 * Tests for MetaHeader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import MetaHeader from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<MetaHeader />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MetaHeader
          meta={{
            metaTitle: 'NepalFranchise',
            ogTitle: 'NepalFranchise',
            metaDescription: '',
            ogDescription: '',
            metaKeywords: '',
            ogImage: '',
            ogSiteName: 'NepalFranchise',
            ogUrl: 'https://www.NepalFranchise.com',
            ogType: 'learning',
            favIcon: 'test',
          }}
          lang="en"
          dir="ltr"
        />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MetaHeader
          meta={{
            metaTitle: 'NepalFranchise',
            ogTitle: 'NepalFranchise',
            metaDescription: 'NepalFranchise',
            ogDescription: 'NepalFranchise',
            metaKeywords: 'NepalFranchise',
            ogImage: '',
            ICBM: '',
            ogSiteName: 'NepalFranchise',
            ogUrl: 'https://www.NepalFranchise.com',
            ogType: 'learning',
            favIcon: '',
          }}
          lang="en"
          dir="ltr"
        />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
