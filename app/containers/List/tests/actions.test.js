import { getList } from '../actions';
import { GET_LIST } from '../constants';

describe('List Actions', () => {
  describe('Get List Action', () => {
    it('has a type of GET_LIST', () => {
      const expected = {
        type: GET_LIST,
        payload: { fieldName: 'test', apiUrl: 'test' },
      };
      expect(getList('test', 'test')).toEqual(expected);
    });
  });
});
