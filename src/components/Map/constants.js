// Polygons in Trondheim from geojson.io
export const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
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
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
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
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
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
  id: "polygon",
  type: "fill",
  paint: { "fill-color": "#007cbf", "fill-opacity": 0.5 },
};
export const initialViewState = {
  longitude: lerka.longitude,
  latitude: lerka.latitude,
  zoom: 14,
  width: "100%",
  height: "100%",
};
