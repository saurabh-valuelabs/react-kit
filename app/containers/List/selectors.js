import { createSelector } from 'reselect';
import { initialState } from './initialState';

/**
 * Direct selector to the list state domain
 */

const selectListDomain = state => state.list || initialState;

/**
 * Other specific selectors
 */

const makeSelectListLoading = () =>
  createSelector(
    selectListDomain,
    substate => substate.isLoading,
  );

const makeSelectListList = () =>
  createSelector(
    selectListDomain,
    substate => substate.list,
  );

export { makeSelectListLoading, makeSelectListList };
