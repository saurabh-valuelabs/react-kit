import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';

import { readStorage, writeStorage, emptyStorage } from '../../utils/common';

import { getApiCall } from '../../utils/request';

import { validateFormData } from '../../utils/validation';

import {
  FILE_UPLOAD,
  FORM_SUBMIT,
  GET_FORM_VALUES,
  GET_LOGIN_STATUS,
  LOGIN_HANDLER,
  LOGOUT_HANDLER,
  GET_TYPE_AHEAD_OPTIONS,
} from './constants';

import {
  inputHandler,
  formSubmitSuccess,
  submitValidationFailed,
  genericErrorHandler,
  updateFormValues,
  resetFormValues,
  loginSuccess,
  logout,
  setTypeAheadOptions,
} from './actions';

import { selectAppFormsValue, selectAppUserProfile } from './selectors';

// Special Case of Image Upload
function* fileUploadApiCall(action) {
  try {
    const requestURL = 'image_upload';
    const payload = action.payload.fieldValue;
    const response = yield call(
      getApiCall,
      requestURL,
      'upload',
      'MyEndPoint',
      payload,
    );
    const { data, status } = response;
    if (status === 'error') {
      const error = {};
      error.message = `${data}!!! Please try again!!! Contact admin if issue persists.`;
      // dispatch a generic action to the store with the error
      yield put(genericErrorHandler(error));
    } else {
      yield put(
        inputHandler(
          action.payload.formName,
          action.payload.fieldName,
          data.name,
          'text',
        ),
      );
    }
  } catch (error) {
    // const error = {};
    error.message = error.message
      ? `Input Handler - ${error.message}`
      : 'Unexpected error in uploading image, please try again!!! Contact admin if issue persists.';
    // dispatch a generic action to the store with the error
    yield put(genericErrorHandler(error));
  }
}

// Check if user is login by checking session storage

function* loginStatusSessionCall() {
  try {
    let userInfo = yield call(readStorage, 'userInfo');
    const isLogin = yield call(readStorage, 'isLogin');
    const jwtToken = yield call(readStorage, 'jwtToken');
    if (isLogin && isLogin === 'true' && userInfo && userInfo !== 'null') {
      userInfo = JSON.parse(userInfo);
      // dispatch a action to start login
      yield put(loginSuccess(userInfo, true, jwtToken));
    } else {
      // Clears Storage
      yield call(emptyStorage, 'userInfo');
      yield call(emptyStorage, 'isLogin');
      yield call(emptyStorage, 'jwtToken');
      // dispatch a action to start login
      yield put(logout());
    }
  } catch (error) {
    // const error = {};
    error.message = error.message
      ? `Login Status - ${error.message}`
      : 'Unexpected error in getting user session, please try again!!! Contact admin if issue persists.';
    // dispatch a generic action to the store with the error
    yield put(genericErrorHandler(error));
  }
}

function* logoutSessionCall() {
  try {
    yield call(emptyStorage, 'userInfo');
    yield call(emptyStorage, 'isLogin');
    yield call(emptyStorage, 'jwtToken');
    // dispatch a success action to the store with the new data
    yield put(logout());
  } catch (error) {
    // const error = {};
    error.message = error.message
      ? `Logout Handler - ${error.message}`
      : 'Unexpected error in clearing user session, please try again!!! Contact admin if issue persists.';
    // dispatch a failure action to the store with the error
    yield put(genericErrorHandler(error));
  }
}

function* getTypeAheadApiCall(action) {
  try {
    const requestURL = action.payload.path;
    const {
      department_id: departmentId,
      all_department: allDepartment,
    } = yield select(selectAppUserProfile());
    let payload = {};
    if (allDepartment === 'NO') {
      payload = {
        departmentId,
      };
    }
    const response = yield call(
      getApiCall,
      requestURL,
      'select',
      'MyEndPoint',
      payload,
    );
    const { data } = response;
    if (data && data.length) {
      // dispatch a success action to the store with the new data
      yield put(setTypeAheadOptions(action.payload.key, data));
    } else {
      const error = {};
      error.message = 'Invalid Data';
      yield put(genericErrorHandler(error));
    }
  } catch (error) {
    // const error = {};
    error.message = error.message
      ? `GET Type Ahead Handler - ${error.message}`
      : 'Unexpected error in getting options, please try again!!! Contact admin if issue persists.';
    // dispatch a failure action to the store with the error
    yield put(genericErrorHandler(error));
  }
}

function* loginHandlerSessionCall(action) {
  try {
    const data = action.payload.apiResponse;
    const [userInfo] = data;
    if (userInfo) {
      yield call(writeStorage, 'userInfo', JSON.stringify(userInfo));
      yield call(writeStorage, 'isLogin', true);
      yield call(writeStorage, 'jwtToken', userInfo.jwtToken);
      // dispatch a success action to the store with the new data
      yield put(loginSuccess(userInfo, true, userInfo.jwtToken));
    } else {
      const error = {};
      error.message =
        'Unexpected error in response, please try again!!! Contact admin if issue persists.';
      yield put(genericErrorHandler(error));
    }
  } catch (error) {
    // const error = {};
    error.message = error.message
      ? `Login Handler - ${error.message}`
      : 'Unexpected error in setting user session, please try again!!! Contact admin if issue persists.';
    yield put(genericErrorHandler(error));
  }
}

function* formSubmitApiCall(action) {
  try {
    const formFields = yield select(selectAppFormsValue());
    const { staff_id: staffId } = yield select(selectAppUserProfile());
    const payload = {
      ...formFields[action.payload.formName],
      m_staff_id: staffId,
    };
    const formValid = validateFormData(
      action.payload.formFields,
      formFields[action.payload.formName],
    );
    if (formValid && typeof formValid === 'boolean') {
      const response = yield call(
        getApiCall,
        action.payload.path,
        'get',
        'MyEndPoint',
        payload,
      );
      const { data } = response;
      if (data) {
        // dispatch a success action to the store with the new data
        if (action.payload.callBackAction) {
          yield put(
            action.payload.callBackAction(
              data,
              action.payload.formName,
              action.payload.fieldsList,
            ),
          );
        }
        if (action.payload.callFormSuccess) {
          const successMsg = `Form Submitted Successfully`;
          yield put(formSubmitSuccess(action.payload.formName, successMsg));
        }
      } else {
        const error = {};
        error.message =
          'Unexpected error in response, please try again!!! Contact admin if issue persists.';
        yield put(genericErrorHandler(error));
      }
    } else {
      // dispatch a failure action to the store with the error
      const error = {};
      error.message =
        'Form Validation Failed, please address this and try again!!!';
      yield put(
        submitValidationFailed(action.payload.formName, error, formValid),
      );
    }
  } catch (error) {
    // const error = {};
    error.message = error.message
      ? `Form Submission - ${error.message}`
      : 'Unexpected error in form submission, please try again!!! Contact admin if issue persists.';
    yield put(genericErrorHandler(error));
  }
}

function* getFormApiCall(action) {
  try {
    const payload = {};
    if (action.payload.id) {
      payload.id = action.payload.id;
    }
    const response = yield call(
      getApiCall,
      action.payload.path,
      'select',
      'MyEndPoint',
      payload,
    );

    // dispatch a success action to the store with the new data
    yield put(
      updateFormValues(
        action.payload.formName,
        response.data,
        action.payload.readOnly,
        action.payload.fieldsList,
      ),
    );
  } catch (error) {
    error.message = error.message
      ? `GET INFO BY API - ${error.message}`
      : 'Unexpected error in getting api data, please try again!!! Contact admin if issue persists.';
    yield put(
      resetFormValues({}, action.payload.formName, action.payload.fieldsList),
    );
    yield put(genericErrorHandler(error));
  }
}

// Individual exports for testing
export default function* appSaga() {
  yield takeLatest(FILE_UPLOAD, fileUploadApiCall);
  yield takeLatest(GET_LOGIN_STATUS, loginStatusSessionCall);
  yield takeLatest(LOGIN_HANDLER, loginHandlerSessionCall);
  yield takeLatest(LOGOUT_HANDLER, logoutSessionCall);
  yield takeLatest(FORM_SUBMIT, formSubmitApiCall);
  yield takeLatest(GET_FORM_VALUES, getFormApiCall);
  yield takeEvery(GET_TYPE_AHEAD_OPTIONS, getTypeAheadApiCall);
}
