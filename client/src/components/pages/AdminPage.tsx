import React, { lazy, memo, useState } from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from 'react-redux';
import { getAllOrders } from "../../store/orders";
// const Map = lazy(() => import('../common/Map/Map'))
import Map from "../common/Map/Map";
import { OrderType } from "../../types/types";
import { getAllDrivers } from "../../store/drivers";
import { getAllTrucks } from "../../store/trucks";

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(false)
  const [order, setOrder] = useState({} as OrderType)
  const [dataType, setDataType] = useState('orders');
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers())
  const trucks = useSelector(getAllTrucks());

  const setMapVissible = (data: OrderType) => {
    setLoad(true);
    setOrder(data)
  }

  const changeDataType = (dataType: string) => {
    setDataType(dataType);
  }

  const samplingDataEntity = () => {
    if (dataType === 'orders') {
      return orders;
    } else if (dataType === 'drivers') {
      return drivers;
    } else {
      return trucks;
    }
} 

  const data = samplingDataEntity()

  return (
    <div className="admin_wrapper">
      <AdminPanelNav dataType={dataType} changeDataType={changeDataType}/>
      <div className="admin_content">
        <AdminPanelSearchBar />
        <div className="flex admin_content-wrapper">
          <AdminList onClickHandle={setMapVissible} dataType={dataType} data={data}/>
          {load ? <Map data={order} /> : <div>Waiting</div>}
        </div>
      </div>
    </div>
  );
});

export default AdminPage;
