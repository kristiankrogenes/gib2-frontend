import React from 'react';
import ReactGlobe from 'react-globe.gl';
import { renderToStaticMarkup } from 'react-dom/server';
import pic from './Picture/picture.jpg';
import './globe.css';

const _renderPopup = (index) => {
  return (
    <div className="Popup">
      <div className="Popup__title">Popup</div>
      <div className="Popup__content">Item: {index}</div>
    </div>
  );
};

const N = 20;
const arcsData = [...Array(N).keys()].map((_, index) => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  name: renderToStaticMarkup(_renderPopup(index)),
  color: [
    ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
  ],
  endpoint: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
}));

const w = window.innerWidth;
const shiftFactor = 0.4;
const shiftAmmount = shiftFactor * w;

function Globe() {
  return (
    <div style={{ textAlign: 'center' }}>
      <ReactGlobe
        globeImageUrl={pic}
        arcsData={arcsData}
        arcColor={'color'}
        arcStroke={0.7}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => 4000}
        onArcClick={(arcProps) => {
          window.open(arcProps.endpoint);
        }}
      />
    </div>
  );
}

export default Globe;
