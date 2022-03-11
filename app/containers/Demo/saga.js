import { takeLatest, call, put /* select */ } from 'redux-saga/effects';

import { DEFAULT_ACTION } from './constants';

import { defaultActionSuccess, defaultActionFailure } from './actions';

import { getApiCall } from '../../utils/request';

function* defaultApiCall() {
  const requestURL = 'your-api-url';
  try {
    const response = yield call(getApiCall, requestURL, 'get', 'CMS', {});

    // dispatch a success action to the store with the new data
    yield put(defaultActionSuccess(response));
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(defaultActionFailure(error));
  }
}

// Individual exports for testing
export default function* demoSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultApiCall);
}
