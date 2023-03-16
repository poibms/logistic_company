import { YMaps, Map as YandexMap, Placemark } from "@pbe/react-yandex-maps";
import * as React from "react";
import ItemList from "../ItemInfo/ItemInfo";

type MapPropsType = {
  data: any
}

const Map: React.FC<MapPropsType> = ({data}) => {
  return (
    <>
      <div className="map_wrapper">
        <YMaps>
          <YandexMap
            defaultState={{
              center: [55.75, 37.57],
              zoom: 9,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            width='100%'
            height='100%'
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
            <ItemList order={data}/>
          </YandexMap>
        </YMaps>
      </div>
    </>
  );
};

export default Map;
