/*
 *
 * App actions
 *
 */

import {
  GENERIC_ERROR_HANDLER,
  INPUT_HANDLER,
  FILE_UPLOAD,
  FORM_SUBMIT,
  FORM_SUBMIT_SUCCESS,
  SUBMIT_VALIDATION_FAILED,
  GET_FORM_VALUES,
  UPDATE_FORM_VALUES,
  RESET_FORM_VALUES,
  GET_TYPE_AHEAD_OPTIONS,
  SET_TYPE_AHEAD_OPTIONS,
  GET_LOGIN_STATUS,
  LOGIN_HANDLER,
  LOGIN_SUCCESS,
  LOGOUT_HANDLER,
  LOGOUT,
} from './constants';

/**
 * Generic
 */

export function genericErrorHandler(error) {
  return {
    type: GENERIC_ERROR_HANDLER,
    payload: { error },
  };
}

/**
 * Form Related
 */

export function inputHandler(formName, fieldName, fieldValue, type) {
  return {
    type: INPUT_HANDLER,
    payload: { formName, fieldName, fieldValue, type },
  };
}

export function fileUpload(formName, fieldName, fieldValue, type) {
  return {
    type: FILE_UPLOAD,
    payload: { formName, fieldName, fieldValue, type },
  };
}

export function formSubmit(
  formName,
  path,
  callBackAction,
  formFields,
  callFormSuccess,
  fieldsList = false,
) {
  return {
    type: FORM_SUBMIT,
    payload: {
      formName,
      path,
      callBackAction,
      formFields,
      callFormSuccess,
      fieldsList,
    },
  };
}

export function formSubmitSuccess(formName, staffName) {
  return {
    type: FORM_SUBMIT_SUCCESS,
    payload: { formName, staffName },
  };
}

export function submitValidationFailed(formName, error, validationResponse) {
  return {
    type: SUBMIT_VALIDATION_FAILED,
    payload: { formName, error, validationResponse },
  };
}

/**
 * Form Value Set
 */

export function getFormValues(
  path,
  id,
  formName,
  readOnly,
  fieldsList = false,
) {
  return {
    type: GET_FORM_VALUES,
    payload: { path, id, formName, readOnly, fieldsList },
  };
}

export function updateFormValues(
  formName,
  response,
  readOnly,
  fieldsList = false,
) {
  return {
    type: UPDATE_FORM_VALUES,
    payload: { formName, response, readOnly, fieldsList },
  };
}

export function resetFormValues(data, formName, fieldsList = false) {
  return {
    type: RESET_FORM_VALUES,
    payload: { data, formName, fieldsList },
  };
}

/**
 * Type Ahead Params
 */

export function getTypeAheadOptions(path, key) {
  return {
    type: GET_TYPE_AHEAD_OPTIONS,
    payload: { path, key },
  };
}

export function setTypeAheadOptions(key, response) {
  return {
    type: SET_TYPE_AHEAD_OPTIONS,
    payload: { key, response },
  };
}

/**
 * Login Related
 */

export function getLoginStatus() {
  return {
    type: GET_LOGIN_STATUS,
  };
}

export function loginHandler(apiResponse) {
  return {
    type: LOGIN_HANDLER,
    payload: { apiResponse },
  };
}

export function loginSuccess(userProfile, isLogin, jwtToken) {
  return {
    type: LOGIN_SUCCESS,
    payload: { userProfile, isLogin, jwtToken },
  };
}

export function logoutHandler() {
  return {
    type: LOGOUT_HANDLER,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
