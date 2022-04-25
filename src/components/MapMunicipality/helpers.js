import { county, emptyInsight, municipalityURL, total } from './constants';
import axiosInstance from '../../utils/axios';
import axios from 'axios';

export const getPolygons = async (value) => {
  const response = await (value === county
    ? axiosInstance.get('api/counties/')
    : axios.get(municipalityURL));

  const insight = await axiosInstance.get('api/insights/');
  const polygons = response.data;

  const name = value === county ? 'name' : 'kommunenavn';
  polygons.features.forEach((e) => {
    if (insight.data[value][e.properties[name]]) {
      e.properties.insight = insight.data[value][e.properties[name]];
    } else {
      e.properties.insight = emptyInsight;
    }
  });
  return polygons;
};

export const getValueFunction = (compareValue, fuel) =>
  compareValue === total
    ? (f) => f.properties.insight.total
    : (f) => f.properties.insight.prices[fuel].average;

// const renderCountyChoroplethMap = async () => {
//   const response = await axiosInstance.get('api/counties/');
//   const insight = await axiosInstance.get('api/insights/');
//   const all = response.data;
//   const name = value === 'county' ? 'name' : 'kommunenavn';
//   all.features.forEach((e) => {
//     if (insight.data[value][e.properties[name]]) {
//       e.properties.insight = insight.data[value][e.properties[name]];
//     } else {
//       e.properties.insight = emptyInsight;
//     }
//   });
//   setPolygons(all);
// };
