import cityApi from 'api/cityApi';
import { ListResponse, City } from 'models';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield delay(1000);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('Failed to load');
    yield put(cityActions.fetchCityListFailed());
  }
}

function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}

export default citySaga;
