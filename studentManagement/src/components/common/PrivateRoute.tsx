import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userLogged = Boolean(localStorage.getItem('access_token'));

  return userLogged
    ? <Outlet />
    : (
      <Navigate
        to="/login"
      />
    );
};

export { PrivateRoute };