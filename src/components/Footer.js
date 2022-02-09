import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      Copyright © GIB2 {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    color: "white",
    background: "#90A4AE",
  },
  mainContainer: {
    padding: "50px 0 20px 0",
  },
  membersContainer: {
    textAlign: "center",
    paddingBottom: "50px",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.mainContainer}>
        <div className={classes.membersContainer}>
          <Typography variant="h5" gutterBottom>
            Geografisk Informasjonsbehandling 2
          </Typography>
          <Typography variant="subtitle1">Jens Hovem Leonhardsen</Typography>
          <Typography variant="subtitle1">Sigurd Bakkerud</Typography>
          <Typography variant="subtitle1">Vemund Thallaug Lund</Typography>
          <Typography variant="subtitle1">Kristian Walseth Krøgenes</Typography>
        </div>
        <Copyright />
      </div>
    </div>
  );
}

export default Footer;
