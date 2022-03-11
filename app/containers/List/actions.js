/*
 *
 * List actions
 *
 */

import { GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE } from './constants';

export function getList(fieldName, apiUrl) {
  return {
    type: GET_LIST,
    payload: { fieldName, apiUrl },
  };
}

export function getListSuccess(data, fieldName, apiUrl) {
  return {
    type: GET_LIST_SUCCESS,
    payload: { data, fieldName, apiUrl },
  };
}

export function getListFailure(error, fieldName, apiUrl) {
  return {
    type: GET_LIST_FAILURE,
    payload: { error, fieldName, apiUrl },
  };
}
