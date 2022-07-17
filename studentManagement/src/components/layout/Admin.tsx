import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/common';
import { Outlet } from 'react-router-dom';
import './admin.css';

const AdminLayout = () => {
  return (
    <Box className='root'>
      <Box className='header'>
        <Header />
      </Box>
      <Box className='sidebar'>
        <Sidebar />
      </Box>
      <Box className='main'>
        <Outlet />
      </Box>
    </Box>
  )
};

export default AdminLayout;