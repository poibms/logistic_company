import { YMaps, Map as YandexMap, Placemark, RoutePanel } from "@pbe/react-yandex-maps";
import * as React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrderrById } from "../../../../store/orders";
import ItemList from "../OrderDeteledInfo/OrderDeteledInfo";


const Map: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const order = useSelector(getOrderrById(+orderId!));
  return (
    <>
    {order ? 
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
                from: order?.from,
                to: order?.to,
                type: "auto"
              });
            }
          }}/>
            <Placemark defaultGeometry={[55.751574, 37.573856]} />
            <ItemList order={order}/>
          </YandexMap>
        </YMaps>
      </div>
      : <h1>There is no order with such Id</h1>}
    </>
  );
};

export default Map;
