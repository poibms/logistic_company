import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

const AdminPanelNav = () => {
  return (
    <div className="navpanel">
      <div className="navpanel_wrapper">
        <div className="navpanel_img">
          <img
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
            alt="logo"
          />
        </div>
        <div className="navpanel_menu">
          <ul className="navpanel_items">
            <li>
              <DashboardIcon />
              <span>Orders</span>
            </li>
            <li>
              <DashboardIcon />
              <span>Drivers</span>
            </li>
            <li>
              <DashboardIcon />
              <span>Trucks</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="navpanel_submenu">
        <div className="navpanel_wrapper">
          <ul className="navpanel_items">
            <li>
              <DashboardIcon />
              <span>Dashboard</span>
            </li>
            <li>
              <DashboardIcon />
              <span>Dashboard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelNav;
