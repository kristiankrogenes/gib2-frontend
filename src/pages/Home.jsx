import React from 'react';
import MapComponent from '../components/Map';
import ApiTest from '../components/ApiTest.js';

function Home() {
  return (
    <div>
      <ApiTest />
      <MapComponent />
    </div>
  );
}

export default Home;
