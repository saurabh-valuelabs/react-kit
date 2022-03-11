import { render } from 'react-testing-library';

import { createNav } from '../_helper';

import footerNav from '../../../config/_footerNav';

jest.mock('react-router-dom', () => ({ Link: 'a' }));

describe('Navigation helpers', () => {
  describe('Default Helper Function', () => {
    it('returns the expected value', () => {
      const {
        container: { firstChild },
      } = render(createNav(footerNav));
      expect(firstChild).toMatchSnapshot();
    });
  });
});
