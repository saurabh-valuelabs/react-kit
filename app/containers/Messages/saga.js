import { takeLatest, call, put /* select */ } from "redux-saga/effects";

import { GET_MESSAGES } from "./constants";

import { getMessagesSuccess, getMessagesFailure } from "./actions";

import { getApiCall } from "../../utils/request";

function* getMessagesApiCall() {
  const requestURL = "get_messages";
  try {
    const response = yield call(getApiCall, requestURL, "get", "API", {});

    // dispatch a success action to the store with the new data
    yield put(getMessagesSuccess(response.data));
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(getMessagesFailure(error));
  }
}

// Individual exports for testing
export default function* messagesSaga() {
  yield takeLatest(GET_MESSAGES, getMessagesApiCall);
}
