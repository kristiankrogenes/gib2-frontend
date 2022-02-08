import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Map from '../components/Map.js'
import ApiTest from '../components/ApiTest.js';



const useStyles = makeStyles((theme) => ({
  container: {
    padding: '20px 0px 20px 0px',
    textAlign: 'center',
  },
}));

function Home() {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* <Map /> */}
      <ApiTest />
    </div>
  );
}

export default Home;