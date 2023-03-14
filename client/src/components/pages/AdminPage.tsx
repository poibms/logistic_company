import React from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from 'react-redux';
import { getAllOrders } from "../../store/orders";

const AdminPage: React.FC = () => {
  const orders = useSelector(getAllOrders());

  return (
    <div className="admin_wrapper">
      <AdminPanelNav />
      <div className="admin_content">
        <AdminPanelSearchBar />
        <div className="flex admin_content-wrapper">
          <AdminList data={orders}/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
