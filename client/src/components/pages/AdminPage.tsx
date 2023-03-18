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

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(false)
  const [order, setOrder] = useState({} as OrderType)
  const [dataType, setDataType] = useState('orders');
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers())


  const setMapVissible = (data: OrderType) => {
    setLoad(true);
    setOrder(data)
  }

  const changeDataType = (dataType: string) => {
    setDataType(dataType);
  }

  return (
    <div className="admin_wrapper">
      <AdminPanelNav dataType={dataType} changeDataType={changeDataType}/>
      <div className="admin_content">
        <AdminPanelSearchBar />
        <div className="flex admin_content-wrapper">
          <AdminList onClickHandle={setMapVissible} data={orders}/>
          {load ? <Map data={order} /> : <div>Waiting</div>}
        </div>
      </div>
    </div>
  );
});

export default AdminPage;
