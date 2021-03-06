import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';

export function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(5));
  console.log(scale.quantiles());
  return {
    type: 'FeatureCollection',
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return { ...f, properties };
    }),
  };
}
