import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn, getRole } from "../../../store/user";
import Button from "../../ui/Button/Button";
import Container from "../Container";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DropdownMenu from "../../ui/DropDownMenu/DropDownMenu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../../assets/Logomark.png";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const role = useSelector(getRole());
  return (
    <header className="header">
      <Container className={"header__container"}>
        <div className="header__inner">
          <div className="header__logo">
            <NavLink to="/" className="header-buttons-button">
              <div className="logo">
                <img src={Logo} alt="logo" />
                <h3>Luminous</h3>
              </div>
            </NavLink>
          </div>
          <div className="header-buttons">
            {isLoggedIn ? (
              role === 'admin' ? (
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
              ) : role === 'driver' ?  (
                <>
                  <div className="nav_menu">
                    <ArrowDropDownIcon onClick={() => setOpenMenu(!openMenu)}>
                      <DropdownMenu></DropdownMenu>
                    </ArrowDropDownIcon>
                  </div>
                  {openMenu && <DropdownMenu></DropdownMenu>}
                </>
              ) :
              <>

                  <div className="nav_menu">
                    <ArrowDropDownIcon onClick={() => setOpenMenu(!openMenu)}>
                      <DropdownMenu></DropdownMenu>
                    </ArrowDropDownIcon>
                  </div>
                  {openMenu && <DropdownMenu></DropdownMenu>}
                </>
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
