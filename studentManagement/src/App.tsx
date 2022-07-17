import { Notfound, PrivateRoute } from 'components/common';
import AdminLayout from 'components/layout/Admin';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import EditPage from 'features/student/pages/EditPage';
import ListPage from 'features/student';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />}>

      </Route>

      <Route path="/login" element={<LoginPage />}>

      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<Dashboard />}>
          </Route>

          <Route path="students" element={<ListPage />}>

          </Route>

          <Route path="students/add" element={<EditPage />}>
          </Route>

          <Route path="students/:studentId" element={<EditPage />}>
          </Route>
        </Route>

      </Route>

      <Route path="*" element={<Notfound />}>

      </Route>
    </Routes>
  );
}

export default App;
