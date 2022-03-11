import { loginHandler } from '../actions';
import { LOGIN_HANDLER } from '../constants';

describe('App actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: LOGIN_HANDLER,
      };
      expect(loginHandler()).toEqual(expected);
    });
  });
});
