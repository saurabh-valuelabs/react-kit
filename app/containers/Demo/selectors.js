import { createSelector } from 'reselect';
import { initialState } from './initialState';

/**
 * Direct selector to the demo state domain
 */

const selectDemoDomain = state => state.demo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Demo
 */

const makeSelectDemo = () =>
  createSelector(
    selectDemoDomain,
    substate => substate,
  );

const makeSelectDemoLoading = () =>
  createSelector(
    selectDemoDomain,
    substate => substate.isLoading,
  );

const makeSelectDemoHasError = () =>
  createSelector(
    selectDemoDomain,
    substate => substate.hasError,
  );

const makeSelectDemoError = () =>
  createSelector(
    selectDemoDomain,
    substate => substate.error,
  );

const makeSelectDemoMetaTitle = () =>
  createSelector(
    selectDemoDomain,
    substate => substate.metaTitle,
  );

const makeSelectDemoMetaDescription = () =>
  createSelector(
    selectDemoDomain,
    substate => substate.metaDescription,
  );

export default makeSelectDemo;
export {
  selectDemoDomain,
  makeSelectDemoLoading,
  makeSelectDemoHasError,
  makeSelectDemoError,
  makeSelectDemoMetaTitle,
  makeSelectDemoMetaDescription,
};
