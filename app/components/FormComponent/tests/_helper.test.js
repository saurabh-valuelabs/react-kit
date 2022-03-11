import { defaultFunction } from '../_helper';

describe('Form helpers', () => {
  describe('Default Helper Function', () => {
    it('returns the expected value', () => {
      const expected = 'Sample Text';
      expect(defaultFunction('Sample Text')).toEqual(expected);
    });
  });
});
