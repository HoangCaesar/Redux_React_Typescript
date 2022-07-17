import { takeEvery, delay, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSuccess } from './counterSlice';
import { fetchCount } from './counterAPI';

// function* log(action: PayloadAction) {
//     console.log('log', action);
// }

function* test() {
  yield fetchCount(2);

  yield call(fetchCount, 2);
}

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 2s');
  //  Waiting 2s
  yield delay(1000);

  console.log('Waiting done, Dispatch Action');
  //  Dispatch Action
  yield put(incrementSuccess(action.payload));
}

function* counterSaga() {
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}

export default counterSaga;
