import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    background: "#EEEEEE",
    alignItems: "center",
    color: "black",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.headerContainer} position="static">
      <Toolbar disableGutters>
        <Typography>GIB2 PROSJEKT</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
