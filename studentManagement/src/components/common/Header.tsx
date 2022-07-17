import { Box, createTheme, ThemeProvider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../../features/auth/authSlice';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Header() {
    const dispatch = useAppDispatch();

    const handleLogoutClick = () => {
        dispatch(authActions.logout());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="#fff">
                            Student Management
                        </Typography>
                        <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}

export { Header };

