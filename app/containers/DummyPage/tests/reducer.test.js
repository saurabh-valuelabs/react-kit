// import produce from 'immer';
import dummyPageReducer from '../reducer';
import { initialState } from './initialState';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('dummyPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(dummyPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   * const expectedResult = produce(state, draft => {
   * draft.isLoading = true;
   * draft.hasError = false;
   * draft.error = '';
   * });
   *
   * expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
