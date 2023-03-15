import React, { lazy, useState } from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from 'react-redux';
import { getAllOrders } from "../../store/orders";
const Map = lazy(() => import('../common/Map/Map'))

const AdminPage: React.FC = () => {
  const [load, setLoad] = useState(false)
  const orders = useSelector(getAllOrders());

  return (
    <div className="admin_wrapper">
      <AdminPanelNav />
      <div className="admin_content">
        <AdminPanelSearchBar />
        <div className="flex admin_content-wrapper">
          <AdminList onClickHandle={setLoad} data={orders}/>
          {load ? <Map /> : <div>Waiting</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
