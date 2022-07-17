import { authSaga } from 'features/auth/authSaga';
import citySaga from 'features/city/citySaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';
import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counterSaga';

function* rootSaga() {
  yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}

export default rootSaga;
