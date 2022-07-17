import { useState } from 'react';
import { Paper, Typography, Box, Button, Input, CircularProgress } from '@mui/material';
import './loginPage.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, authSelectIsLogging } from '../authSlice';

const LoginPage = () => {
  const  isLogging = useAppSelector(authSelectIsLogging);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const handleSetUsername = (value: string) => {
    setUserName(value);
  }

  const handleSetPassword = (value: string) => {
    setPassWord(value);
  }

  const handleLoginClick = () => {
    // TODO: get username + password from loggin form
    dispatch(authActions.login({
      username: userName,
      password: passWord
    }))
  }
  return (
    <div className="loginPage">
      <Paper elevation={1} className="loginPage__paper">
        <Typography variant="h5" component="h1">Student Management</Typography>

        <Box mt={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '476px',
            height: '164px',
          }}
        >
          <div>
            <Input type="text" required placeholder="User name" fullWidth onChange={(e) => handleSetUsername(e.target.value) }/>
            <Input type="password" required placeholder="Password" fullWidth onChange={(e) => handleSetPassword(e.target.value) }/>
          </div>

          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            { isLogging ? <CircularProgress  size={20} color="secondary" /> : ''} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  )
};

export default LoginPage;