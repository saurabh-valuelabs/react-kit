/*
 *
 * List reducer
 *
 */
import produce from 'immer';
import { toast } from 'react-toastify';
import { GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE } from './constants';

import { initialState } from './initialState';

/* eslint-disable default-case, no-param-reassign */
const listReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST:
        draft.isLoading = true;
        draft.list[action.payload.fieldName] =
          initialState.list[action.payload.fieldName];
        break;
      case GET_LIST_SUCCESS:
        draft.isLoading = false;
        draft.list[action.payload.fieldName] = action.payload.data;
        break;
      case GET_LIST_FAILURE:
        draft.isLoading = false;
        draft.list[action.payload.fieldName] =
          initialState.list[action.payload.fieldName];
        toast.error(action.payload.error.message);
        break;
    }
  });

export default listReducer;
