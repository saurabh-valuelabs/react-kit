/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  DEFAULT_ACTION_SUCCESS,
  DEFAULT_ACTION_FAILURE,
} from './constants';

import { initialState } from './initialState';

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.isLoading = true;
        break;
      case DEFAULT_ACTION_SUCCESS:
        draft.isLoading = false;
        draft.defaultValue = action.payload.data;
        break;
      case DEFAULT_ACTION_FAILURE:
        draft.isLoading = false;
        draft.hasError = true;
        draft.error = action.payload.error;
        break;
    }
  });

export default dashboardReducer;
