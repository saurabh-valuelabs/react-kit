import { createSelector } from "reselect";
import { initialState } from "./initialState";

/**
 * Direct selector to the messages state domain
 */

const selectMessagesDomain = (state) => state.messages || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Messages
 */

const makeSelectMessages = () =>
  createSelector(
    selectMessagesDomain,
    (substate) => substate
  );

const makeSelectMessagesLoading = () =>
  createSelector(
    selectMessagesDomain,
    (substate) => substate.isLoading
  );

const makeSelectMessagesHasError = () =>
  createSelector(
    selectMessagesDomain,
    (substate) => substate.hasError
  );

const makeSelectMessagesError = () =>
  createSelector(
    selectMessagesDomain,
    (substate) => substate.error
  );

const makeSelectMessagesMeta = () =>
  createSelector(
    selectMessagesDomain,
    (substate) => substate.meta
  );

const makeSelectMessagesUserMessages = () =>
  createSelector(
    selectMessagesDomain,
    (substate) => substate.userMessages
  );

export default makeSelectMessages;
export {
  selectMessagesDomain,
  makeSelectMessagesLoading,
  makeSelectMessagesHasError,
  makeSelectMessagesError,
  makeSelectMessagesMeta,
  makeSelectMessagesUserMessages,
};
