import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../store/user";
import { useAppDispatch } from "../../../store";
import Logo from "../../../assets/Logomark.png";

type NavPropsType = {
  changeDataType: any;
  queryParams: URLSearchParams;
}

const AdminPanelNav: React.FC<NavPropsType> = ({changeDataType, queryParams}) => {
  const listItemButtons = [
    { name: "orders", label: 'Orders' },
    { name: "drivers", label: 'Drivers' },
    { name: "trucks", label: 'Trucks' },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const listItem = listItemButtons.map(({ name, label }) => {
    const active = queryParams.get('filter') === name;
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
        <div className="navpanel_img" onClick={() => navigate('/')}>
          <img
            src={Logo}
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
            <li onClick={()=> dispatch(userLogout(()=>navigate('/')))}>
              <LogoutIcon />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelNav;
