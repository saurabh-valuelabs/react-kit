import { createSelector } from 'reselect';
import { initialState } from './initialState';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );

const makeSelectDashboardLoading = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.isLoading,
  );

const makeSelectDashboardHasError = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.hasError,
  );

const makeSelectDashboardError = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.error,
  );

const makeSelectDashboardMetaTitle = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.metaTitle,
  );

const makeSelectDashboardMetaDescription = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate.metaDescription,
  );

export default makeSelectDashboard;
export {
  selectDashboardDomain,
  makeSelectDashboardLoading,
  makeSelectDashboardHasError,
  makeSelectDashboardError,
  makeSelectDashboardMetaTitle,
  makeSelectDashboardMetaDescription,
};
