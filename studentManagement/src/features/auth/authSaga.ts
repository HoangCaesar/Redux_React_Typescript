import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { rootNavigate } from 'hooks/CustomRouter';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(2000);
    localStorage.setItem('access_token', 'fake_token');
    // yield put(
    //   authActions.loginSuccess({
    //     id: `${payload.username}_${payload.password.length}`,
    //     name: payload.username,
    //   })
    // );
    // redirect
    yield call(rootNavigate, '/admin/dashboard');
  } catch (error) {
    yield put(authActions.loginFailed('Failed to login'));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield call(rootNavigate, '/login');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
