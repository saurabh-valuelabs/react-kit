/*
 *
 * Messages reducer
 *
 */
import produce from "immer";
import {
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
} from "./constants";

import { initialState } from "./initialState";

/* eslint-disable default-case, no-param-reassign */
const messagesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MESSAGES:
        draft.isLoading = true;
        break;
      case GET_MESSAGES_SUCCESS:
        draft.isLoading = false;
        draft.userMessages.body = action.payload.data;
        break;
      case GET_MESSAGES_FAILURE:
        draft.isLoading = false;
        draft.hasError = true;
        draft.error = action.payload.error;
        break;
    }
  });

export default messagesReducer;
