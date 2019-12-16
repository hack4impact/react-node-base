import { call, put, takeLatest } from 'redux-saga/effects';

import { checkAuth } from 'security/actions';
import SecurityApi from 'security/api';
import {goTo} from "utils/history";
import {PATHS} from "config";
import {flashInfo} from "components/Flash";

function* sagaWorker() {
  try {
    const response = yield call(SecurityApi.checkAuth);
    yield put(checkAuth.success(response));
  } catch (error) {
    yield put(checkAuth.failure());
    yield flashInfo('You\'ve logged out');
    yield call(goTo(PATHS.Login));
  }
}

export default function* saga() {
  yield takeLatest(checkAuth.TRIGGER, sagaWorker);
}
