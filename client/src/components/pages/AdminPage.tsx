import React, { lazy, memo, useState } from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from 'react-redux';
import { getAllOrders } from "../../store/orders";
// const Map = lazy(() => import('../common/Map/Map'))
import Map from "../common/Map/Map";

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(false)
  const [order, setOrder] = useState('')
  const orders = useSelector(getAllOrders());

  const setMapVissible = (data: any) => {
    setLoad(true);
    setOrder(data)
    // return <Map data={data} />
  }

  return (
    <div className="admin_wrapper">
      <AdminPanelNav />
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
