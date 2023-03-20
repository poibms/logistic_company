import { YMaps, Map as YandexMap, Placemark, RoutePanel } from "@pbe/react-yandex-maps";
import * as React from "react";
import { OrderType } from "../../../../types/types";
import ItemList from "../OrderDeteledInfo/OrderDeteledInfo";

type MapPropsType = {
  data: OrderType
}

const Map: React.FC<MapPropsType> = ({data}) => {
  return (
    <>
      <div className="map_wrapper">
        <YMaps query={{'apikey': '7240ea03-95e6-44f3-a9c4-e4b336df23ec'}}>
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
            <RoutePanel options={{ float: "right", visible: false}} instanceRef={ref => {
            if (ref) {
              ref.routePanel.state.set({
                fromEnabled: false,
                from: data.from,
                to: data.to,
                type: "auto"
              });
            }
          }}/>
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
            <ItemList order={data}/>
          </YandexMap>
        </YMaps>
      </div>
    </>
  );
};

export default Map;
