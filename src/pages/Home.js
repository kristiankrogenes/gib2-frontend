import React from 'react';
import Map from '../components/Map.js'
import ApiTest from '../components/ApiTest.js';

function Home() {
  return (
    <div>
      <ApiTest />
        <Map />
    </div>
  );
}

export default Home;