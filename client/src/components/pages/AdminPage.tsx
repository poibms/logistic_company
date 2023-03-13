import React from "react";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";

const AdminPage: React.FC = () => {
  return (
    <div className="admin_wrapper">
      <AdminPanelNav />
      <div className="admin_content-wrapper">
        <AdminPanelSearchBar />
      </div>
    </div>
  );
};

export default AdminPage;
