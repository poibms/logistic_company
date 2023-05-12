import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchInput from "../../ui/SearchInput/SearchInput";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logomark.png";
import MenuIcon from '@mui/icons-material/Menu';

type SearchBarType = {
  searchHandler: any;
  setOpenBurger: any;
};

const AdminPanelSearchBar: React.FC<SearchBarType> = ({ searchHandler, setOpenBurger }) => {
  const navigate = useNavigate();
  return (
    <div className="searchbar">
      <div className="searchbar_wrapper">
        <div className="searchbar_flex">
          <div className="searchbar_img" onClick={() => setOpenBurger(true)}>
          <MenuIcon />
          </div>
          <div className="searchbar_title">
            <h3>DASHBOARD</h3>
          </div>
        </div>
        <div className="searchbar_flex">
          <div className="searchbar_input">
            <SearchInput searchHandler={searchHandler} />
          </div>
          <NavLink to="/adminpanel">
            <AccountCircleIcon />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelSearchBar;
