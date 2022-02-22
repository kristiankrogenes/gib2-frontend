import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import axiosInstance from "../../utils/axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(error);
    const user = {
      username: username,
      password: password,
    };
    axiosInstance
      .post(`users/token/`, user)
      .then((res) => {
        console.log("STATUS:", res);
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          //   window.location.replace("http://localhost:3000");
        }
      })
      .catch((e) => setError(true));
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
                {"Ingen bruker? Registrer nå"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
