/*
 *
 * Messages actions
 *
 */

import {
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
} from "./constants";

export function getMessages() {
  return {
    type: GET_MESSAGES,
  };
}

export function getMessagesSuccess(data) {
  return {
    type: GET_MESSAGES_SUCCESS,
    payload: { data },
  };
}

export function getMessagesFailure(error) {
  return {
    type: GET_MESSAGES_FAILURE,
    payload: { error },
  };
}
