import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Logo from "../../../assets/Logomark.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLogout } from "../../../store/user";
import CloseIcon from '@mui/icons-material/Close';

const listItemButtons = [
  { name: "orders", label: "Orders" },
  { name: "drivers", label: "Drivers" },
  { name: "trucks", label: "Trucks" },
];

type NavPropsType = {
  changeDataType: any;
  queryParams: URLSearchParams;
  setOpenBurger: any;
};

const AdminBurgerMenu: React.FC<NavPropsType> = ({
  changeDataType,
  queryParams,
  setOpenBurger,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const listItem = listItemButtons.map(({ name, label }) => {
    const active = queryParams.get("filter") === name;
    return (
      <li
        key={name}
        className="burgermenu_li"
        onClick={() => changeDataType(name)}
      >
        <DashboardIcon />
        <span>{label}</span>
      </li>
    );
  });
  return (
    <div className="burgermenu">
      <div className="burgermenu_inner">
        <div className="burgermenu_wrapper flex flex_column">
          <div className="burgermenu_logo" onClick={() => navigate("/")}>
            <img src={Logo} alt="logo" />
            <h1>Luminous</h1>
          </div>
          <div className="burgermenu_nav">
            {listItem}
            <li
              className="burgermenu_li"
              onClick={() => dispatch(userLogout(() => navigate("/")))}
            >
              <LogoutIcon />
              <span>Logout</span>
            </li>

            <li
              className="burgermenu_li"
              onClick={() => setOpenBurger(false)}
            >
              <CloseIcon/>
              <span>Close</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBurgerMenu;
