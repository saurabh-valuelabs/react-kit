import { takeLatest, call, put /* select */ } from 'redux-saga/effects';

import { GET_LIST } from './constants';

import { getListSuccess, getListFailure } from './actions';

import { getApiCall } from '../../utils/request';

function* getListApiCall(action) {
  const requestURL = action.payload.apiUrl;
  try {
    const response = yield call(
      getApiCall,
      requestURL,
      'select',
      'MyEndPoint',
      {},
    );

    // dispatch a success action to the store with the new data
    yield put(getListSuccess(response.data, action.payload.fieldName));
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(getListFailure(error, action.payload.fieldName));
  }
}

// Individual exports for testing
export default function* listSaga() {
  yield takeLatest(GET_LIST, getListApiCall);
}
