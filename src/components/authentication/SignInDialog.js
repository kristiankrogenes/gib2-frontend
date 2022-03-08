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

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    axiosInstance
      .post(`users/token/`, user)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + res.data.access;
          window.location.replace(process.env.REACT_APP_WEB_URL);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {error ? (
          <Typography color="error">Feil brukernavn eller passord</Typography>
        ) : null}
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Brukernavn"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Log in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/glemt-passord" variant="body2">
                Glemt passord?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registrer" variant="body2">
                {'Ingen bruker? Registrer nå'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
