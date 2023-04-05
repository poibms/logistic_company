import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn, isAdmin as getIsAdmin } from "../../../store/user";
import Button from "../../ui/Button/Button";
import Container from "../Container";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropdownMenu from "../../ui/DropDownMenu/DropDownMenu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isAdmin = useSelector(getIsAdmin());
  return (
    <header className="header">
      <Container className={"header__container"}>
        <div className="header__inner">
          <div className="header__logo">
            <NavLink to="/" className="header-buttons-button">
              <h3>Logistic company</h3>
            </NavLink>
          </div>
          <div className="header-buttons">
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <NavLink to="/adminpanel" className="header-buttons-button">
                    <AdminPanelSettingsIcon />
                  </NavLink>
                  <div className="nav_menu">
                  <ArrowDropDownIcon onClick={() => setOpenMenu(!openMenu)}>
                    <DropdownMenu></DropdownMenu>
                  </ArrowDropDownIcon>
                  </div>
                  {openMenu && <DropdownMenu></DropdownMenu>}
                </>
              ) : (
                <>
                  <NavLink to="/createorder" className="header-buttons-button">
                    <Button className="button">Создать заказ</Button>
                  </NavLink>
                  <NavLink to="/profile" className="header-buttons-button">
                    <AccountCircleIcon />
                  </NavLink>
                </>
              )
            ) : (
              <>
                <NavLink to="/login/signIn" className="header-buttons-button">
                  <Button className="button">Sign In</Button>
                </NavLink>
                <NavLink to="/login/signUp" className="header-buttons-button">
                  <Button className="button">Sign Up</Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
