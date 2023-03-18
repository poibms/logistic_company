import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

type NavPropsType = {
  dataType: string;
  changeDataType: any;
}

const AdminPanelNav: React.FC<NavPropsType> = ({dataType, changeDataType}) => {
  const listItemButtons = [
    { name: "orders", label: 'Orders' },
    { name: "drivers", label: 'Drivers' },
    { name: "trucks", label: 'Trucks' },
  ];

  const listItem = listItemButtons.map(({ name, label }) => {
    const active = dataType === name;
    const activeClass = active ? 'active' : ''
    return (
      <li
        key={name}
        className={`${activeClass}`}
        onClick={() => changeDataType(name)}
      >
        <DashboardIcon/>
        <span>{label}</span>
      </li>
    );
  });

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
            {listItem}
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
