import { createSelector } from 'reselect';
import { initialState } from './initialState';

/**
 * Direct selector to the dummyPage state domain
 */

const selectDummyPageDomain = state => state.dummyPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DummyPage
 */

const makeSelectDummyPage = () =>
  createSelector(
    selectDummyPageDomain,
    substate => substate,
  );

const makeSelectDummyPageLoading = () =>
  createSelector(
    selectDummyPageDomain,
    substate => substate.isLoading,
  );

const makeSelectDummyPageHasError = () =>
  createSelector(
    selectDummyPageDomain,
    substate => substate.hasError,
  );

const makeSelectDummyPageError = () =>
  createSelector(
    selectDummyPageDomain,
    substate => substate.error,
  );

const makeSelectDummyPageMetaTitle = () =>
  createSelector(
    selectDummyPageDomain,
    substate => substate.metaTitle,
  );

const makeSelectDummyPageMetaDescription = () =>
  createSelector(
    selectDummyPageDomain,
    substate => substate.metaDescription,
  );

export default makeSelectDummyPage;
export {
  selectDummyPageDomain,
  makeSelectDummyPageLoading,
  makeSelectDummyPageHasError,
  makeSelectDummyPageError,
  makeSelectDummyPageMetaTitle,
  makeSelectDummyPageMetaDescription,
};
