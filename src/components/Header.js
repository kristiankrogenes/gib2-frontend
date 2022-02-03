import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    background: '#EEEEEE',
    alignItems: 'center',
    color: 'black',
  },
}));

function Header() {

    const classes = useStyles();

    return (
        <AppBar className={classes.headerContainer} position="static">
            <Toolbar disableGutters>
                <Typography>
                    GIB2 PROSJEKT
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;