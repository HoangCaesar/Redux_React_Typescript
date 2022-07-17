import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _limit: 5, _page: 1, gender: 'male' }),
    call(studentApi.getAll, { _limit: 5, _page: 1, gender: 'female' }),
    call(studentApi.getAll, { _limit: 5, _page: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _limit: 5, _page: 1, mark_lte: 5 }),
  ]);

  const statisticsList = responseList.map((response) => response.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;

  yield put(dashboardActions.setSatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _limit: 5,
    _page: 1,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _limit: 5,
    _page: 1,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCity() {
  // fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  // fetch ranking students list per city
  const callList = cityList.map((city) =>
    call(studentApi.getAll, {
      _limit: 5,
      _page: 1,
      city: city.code,
      _sort: 'mark',
      _order: 'desc',
    })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, index) => ({
    cityName: cityList[index].name,
    rankingList: x.data,
  }));
  // update data
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCity),
    ]);
    // yield delay(1000);
    yield put(dashboardActions.fetchDataSuccess())
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
  }
}

function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}

export default dashboardSaga;
