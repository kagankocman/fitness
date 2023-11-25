import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom/dist";
import { AppBar, Toolbar } from '@mui/material';
import '../App.css';
import ImageView from "./imageView";
import dumbellPhoto from "../img/dumbell.png"

const defaultTheme = createTheme();

export function SignUp() {

  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
        <ImageView />
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                marginLeft: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="birthdate"
                      label="Birth Date"
                      id="birthDate"
                      autoComplete="birthdate"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="gender"
                      name="gender"
                      required
                      fullWidth
                      id="gender"
                      label="Gender"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="phonenumber"
                      name="phonenumber"
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default SignUp;