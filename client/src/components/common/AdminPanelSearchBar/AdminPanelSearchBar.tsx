import * as React from "react";
import InputField from "../InputField/InputField";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminPanelSearchBar = () => {
  return (
    <div className="searchbar">
      <div className="searchbar_wrapper">
        <div className="searchbar_title">
          <h3>DASHBOARD</h3>
        </div>
        <div className="searchbar_input">
          <InputField name='search' placeholder='Search orders, drivers, trucks' />
        </div>
        <div>
          <AccountCircleIcon />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelSearchBar;
