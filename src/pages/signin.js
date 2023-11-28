import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom/dist";
import { AppBar, Toolbar } from '@mui/material';
import '../App.css';
import ImageView from "./imageView";
import dumbellPhoto from "../img/dumbellBlack.png"
import LoginIcon from '@mui/icons-material/Login';
import { auth } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';


const defaultTheme = createTheme();

export function SignIn() {

  let navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await signInWithEmailAndPassword(auth, data.get('email'), data.get('password')).then((user) => {
        alert("Giriş başarılı " + user.user.email)   
      })
    } catch (error) {
        alert(error);
    }
    
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <Box sx={{ minWidth: "100%", backgroundColor: 'rgb(204, 204, 204)' }} justifyContent="flex-end" alignItems="flex-end">
      <Box flexDirection="column" justifyContent="flex-end" alignItems="flex-end" sx={{ minWidth: "100%" }}>
        <AppBar position="static" sx={{ height: '90px', backgroundColor: 'GrayText' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={dumbellPhoto} alt="" style={{ maxWidth: '%100', height: '50px', marginTop: '15px' }}></img>
            <Typography sx={{ minWidth: "20%", fontSize: '41px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} style={{ marginLeft: 20 }}>Fitness Center</Typography>
            <Button onClick={handleSignUp} sx={{ marginTop: '5px', ml: "60%", backgroundColor: 'Background', color: 'black', fontSize: '16px', fontStyle: 'oblique' }} >
              Sign Up
            </Button>
            <Button style={{ marginLeft: 15 }} sx={{ marginTop: '5px', backgroundColor: 'Background', color: 'black', fontSize: '16px', fontStyle: 'oblique' }} onClick={handleSignIn} >
              Sign In
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box>
          <ImageView />
        </Box>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 15,
                marginLeft: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#0f6199', width: '50px', height: '50px' }}>
                <LoginIcon sx={{ fontSize: '32px' }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs >
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
export default SignIn;