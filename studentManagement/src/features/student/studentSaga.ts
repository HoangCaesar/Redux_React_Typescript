import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { takeLatest, call, put, delay, debounce } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield delay(1000);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to log student list', error);
    yield put(studentActions.fetchStudentListFailed('Failed to load student list'));
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
  yield debounce(1000, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}

export default studentSaga;
