import React, { useState } from "react";
import { YMaps, Map, withYMaps } from "@pbe/react-yandex-maps";

interface Props {
  from: string;
  to: string;
  ymaps: any;
}

const DistanceCalculator: React.FC<Props> = ({ from, to, ymaps }) => {
  const [distance, setDistance] = useState<number | null>(null);

  const calculateDistance = (ymaps: any, from: string, to: string) => {
    Promise.all([ymaps.geocode(from), ymaps.geocode(to)]).then(
      ([fromGeocodeResult, toGeocodeResult]) => {
        const fromCoords = fromGeocodeResult.geoObjects.get(0).geometry.getCoordinates();
        const toCoords = toGeocodeResult.geoObjects.get(0).geometry.getCoordinates();
        const router = new ymaps.router.Route([fromCoords, toCoords]);
        router.then((routeResult: any) => {
          const distance = routeResult.getLength();
          setDistance(distance);
        });
      }
    );
  };

  calculateDistance(ymaps, from, to);

  return (
    <Map defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}>
      {/* Add any other components you want to use */}
      {distance && <p>Distance: {distance} meters</p>}
    </Map>
  );
};

export default withYMaps(DistanceCalculator, true);
