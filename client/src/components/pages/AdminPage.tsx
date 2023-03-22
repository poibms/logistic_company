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
import TruckDeteledInfo from "../common/DeteledItemInfo/TruckdeteledInfo/TruckDeteledInfo";
import AdminFilter from "../common/AdminFilter/AdminFilter";

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as OrderType | DriverType | TruckType);
  const [filterIndex, setFilterIndex] = useState(0);
  const [dataType, setDataType] = useState("orders");
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());


  const handleChangeFilterIndex = (event: React.SyntheticEvent, newValue: any) => {
    console.log(newValue)
    setFilterIndex(newValue);
  };

  const setMapVissible = (data: OrderType) => {
    setLoad(true);
    setData(data);
  };
  const changeDataType = (dataType: string) => {
    setDataType(dataType);
    setLoad(false);
  };

  const genOrdersEntityByFilter = () => {
    switch (filterIndex) {
      case 0:
        return orders.filter((order) => order.status === 'not_assigned')
      case 1: 
        return orders.filter((order) => order.status === 'in_progress')
      case 2: 
        return orders.filter((order) => order.status === 'done')
      default: 
        return orders.filter((order) => order.status === 'not_assigned')
    }
  }

  const genDriversEntityByFilter = () => {
    switch (filterIndex) {
      case 0:
        return drivers.filter((order) => order.truckId === null)
      case 1: 
        return drivers.filter((order) => order.truckId !== null)
      default: 
        return drivers.filter((order) => order.truckId === null)
    }
  }

  const samplingDataEntity = () => {
    if (dataType === "orders") {
      const map = <Map data={data as OrderType} />;
      const filteredOrders = genOrdersEntityByFilter()
      return { entity: filteredOrders, deteledInfo: map };
    } else if (dataType === "drivers") {
      const info = <DriverDeteledInfo driver={data as DriverType} />;
      const filteredDrivers = genDriversEntityByFilter();
      return { entity: filteredDrivers, deteledInfo: info };
    } else {
      const info = <TruckDeteledInfo truck={data as TruckType} />;
      return { entity: trucks, deteledInfo: info };
    }
  };


  const { entity, deteledInfo } = samplingDataEntity();

  return (
    <div className="admin_wrapper">
      <AdminPanelNav dataType={dataType} changeDataType={changeDataType} />
      <div className="admin_content">
        <AdminPanelSearchBar />
        <AdminFilter dataType={dataType} handleChange={handleChangeFilterIndex} value={filterIndex}/>
        <div className="flex admin_content-wrapper">
          <AdminList
            onClickHandle={setMapVissible}
            dataType={dataType}
            data={entity}
          />
          {load ? deteledInfo : <div>waiting</div>}
        </div>
      </div>
    </div>
  );
});

export default AdminPage;
