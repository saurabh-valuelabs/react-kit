import { createSelector } from 'reselect';
import { initialState } from './initialState';

/**
 * Direct selector to the app state domain
 */

const selectAppDomain = state => state.app || initialState;

/**
 * Generic
 */

const selectAppIsLoading = () =>
  createSelector(
    selectAppDomain,
    substate => substate.isLoading,
  );

const selectAppFieldFetched = () =>
  createSelector(
    selectAppDomain,
    substate => substate.fieldFetched,
  );
/**
 * Form Related
 */

const selectAppFormsValue = () =>
  createSelector(
    selectAppDomain,
    substate => substate.formsValue,
  );

const selectAppFormsValid = () =>
  createSelector(
    selectAppDomain,
    substate => substate.formsValid,
  );

const selectAppFormsReadOnly = () =>
  createSelector(
    selectAppDomain,
    substate => substate.formsReadonly,
  );

/**
 * Type Ahead Params
 */

const selectAppTypeAheadOptions = () =>
  createSelector(
    selectAppDomain,
    substate => substate.typeAheadOptions,
  );

/**
 * Login Related
 */
const selectAppIsLogin = () =>
  createSelector(
    selectAppDomain,
    substate => substate.isLogin,
  );

const selectAppUserProfile = () =>
  createSelector(
    selectAppDomain,
    substate => substate.userProfile,
  );

export {
  selectAppDomain,
  selectAppIsLoading,
  selectAppFieldFetched,
  selectAppFormsValue,
  selectAppFormsValid,
  selectAppFormsReadOnly,
  selectAppTypeAheadOptions,
  selectAppIsLogin,
  selectAppUserProfile,
};
