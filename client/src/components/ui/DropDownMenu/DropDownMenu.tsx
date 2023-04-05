import * as React from "react";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron.svg";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { userLogout } from "../../../store/user";

type DropDownItemProps = {
  handleClick: any;
  leftIcon: any;
  rightIcon?: any;
  children: React.ReactNode | React.ReactNode[];
};

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = React.useState("main");
  const [menuHeight, setMenuHeight] = React.useState(undefined);
  const dropdownRef = React.useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownMenuItem(props: any) {
    return (
      <div
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </div>
    );
  }

  const DropdownItem: React.FC<DropDownItemProps> = ({
    handleClick,
    leftIcon,
    rightIcon,
    children,
  }) => {
    return (
      <div className="menu-item" onClick={handleClick}>
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </div>
    );
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<PersonIcon />}
            handleClick={() => navigate("/profile")}
          >
            My Profile
          </DropdownItem>
          <DropdownMenuItem
            leftIcon={<DashboardIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="orders"
          >
            Orders
          </DropdownMenuItem>
          <DropdownItem
            handleClick={()=> dispatch(userLogout(()=>navigate('/')))}
            leftIcon={<LogoutIcon />}
          >
            Logout
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "orders"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownMenuItem goToMenu="main" leftIcon={<ArrowBackIcon />}>
            <h3>Orders Menu</h3>
          </DropdownMenuItem>
          <DropdownItem
            leftIcon={<AddIcon />}
            handleClick={() => console.log("/logout")}
          >
            Create order
          </DropdownItem>
          <DropdownItem
            leftIcon={<ViewListIcon />}
            handleClick={() => console.log("/logout")}
          >
            Orders List
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
