// Polygons in Trondheim from geojson.io
export const geojsonPoly = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [10.399117469787598, 63.41903361299168],
            [10.40276527404785, 63.41628745434791],
            [10.406713485717773, 63.417132454255125],
            [10.403237342834473, 63.41974411470121],
            [10.399117469787598, 63.41903361299168],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [10.405983924865723, 63.41561527754641],
            [10.408945083618164, 63.41561527754641],
            [10.408945083618164, 63.4163642735504],
            [10.405983924865723, 63.4163642735504],
            [10.405983924865723, 63.41561527754641],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [10.407443046569824, 63.40964181437523],
            [10.41006088256836, 63.40964181437523],
            [10.41006088256836, 63.41162030172733],
            [10.407443046569824, 63.41162030172733],
            [10.407443046569824, 63.40964181437523],
          ],
        ],
      },
    },
  ],
};

// coordinates for lerkendalsbygget
export const lerka = {
  longitude: 10.406852960586548,
  latitude: 63.4147798358434,
};

export const layerStyle = {
  id: 'polygon',
  type: 'fill',
  paint: { 'fill-color': '#007cbf', 'fill-opacity': 0.5 },
};
export const pointLayerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 20,
    'circle-color': '#007cbf',
  },
};
export const initialViewState = {
  longitude: lerka.longitude,
  latitude: lerka.latitude,
  zoom: 14,
  width: '100%',
  height: 600,
};

export const mapStyle = 'mapbox://styles/mapbox/streets-v11';

export const pointFile = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [11.085205078125, 63.49467021615008],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.2777099609375, 63.37429418982989],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.9039306640625, 63.40627999376423],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.590820312499998, 63.3989018177513],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.449371337890625, 63.37921740293486],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.364227294921875, 63.40750950529057],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.491943359375, 63.414885467747894],
      },
    },
  ],
};
