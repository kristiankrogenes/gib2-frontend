import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';

import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from '@mui/material';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    axiosInstance
      .post('/users/register/', user)
      .then((res) => {
        if (res.status === 201) {
          axiosInstance
            .post('users/token/', user)
            .then((res) => {
              localStorage.setItem('access_token', res.data.access);
              localStorage.setItem('refresh_token', res.data.refresh);
              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
              window.location.replace(process.env.REACT_APP_WEB_URL);
              // sendVerificationEmail();
              // window.location.replace("http://localhost:3000/profil/bekreft");
            })
            .catch((e) => {
              console.log('ERROR:', e);
            });
          setStatus('Din bruker er nå registrert.');
        } else if (res.status === 226) {
          setStatus('Denne brukeren er allrede registrert.');
        }
      })
      .catch(() => {
        setStatus('oh fuck');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Registrer
        </Typography>
        {status === '' ? null : (
          <Typography color="error" align="center">
            {status}
          </Typography>
        )}
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Brukernavn"
                name="Brukernavn"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Fornavn"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Etternavn"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Passord"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Bekreft passord"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={onSubmit}
            disabled={
              password !== password2 ||
              password === '' ||
              password.trim().replace(' ', '').length < 7
            }
          >
            Registrer profil
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/log-in" variant="body2">
                Allerede registrert?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
