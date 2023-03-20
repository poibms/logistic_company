import React, { memo, useState } from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../store/orders";
import Map from "../common/DeteledItemInfo/Map/Map";
import { DriverType, OrderType, TruckType } from "../../types/types";
import { getAllDrivers } from "../../store/drivers";
import { getAllTrucks } from "../../store/trucks";
import DriverDeteledInfo from "../common/DeteledItemInfo/DriverDeteledInfo/DriverDeteledInfo";

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as OrderType | DriverType | TruckType);
  const [dataType, setDataType] = useState("orders");
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());

  const setMapVissible = (data: OrderType) => {
    setLoad(true);
    setData(data);
  };
  const changeDataType = (dataType: string) => {
    setDataType(dataType);
    setLoad(false)
  };

  const samplingDataEntity = () => {
    if (dataType === "orders") {
      const map = <Map data={(data as OrderType)}/>
      return {entity: orders, deteledInfo: map};
    } else if (dataType === "drivers") {
      const info = <DriverDeteledInfo driver={(data as DriverType)} />
      return {entity: drivers, deteledInfo: info};
    } else {
      const info = <div>Trucks info</div>
      return {entity: trucks, deteledInfo: info};
    }
  };

  const {entity, deteledInfo} = samplingDataEntity();

  return (
    <div className="admin_wrapper">
      <AdminPanelNav dataType={dataType} changeDataType={changeDataType} />
      <div className="admin_content">
        <AdminPanelSearchBar />
        <div className="flex admin_content-wrapper">
          <AdminList
            onClickHandle={setMapVissible}
            dataType={dataType}
            data={entity}
          />
          {load ? deteledInfo : <div>Waiting</div>}
        </div>
      </div>
    </div>
  );
});

export default AdminPage;
