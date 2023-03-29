import * as React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchInput from "../../ui/SearchInput/SearchInput";

type SearchBarType = {
  searchHandler: any
}

const AdminPanelSearchBar: React.FC<SearchBarType> = ({searchHandler}) => {
  return (
    <div className="searchbar">
      <div className="searchbar_wrapper">
        <div className="searchbar_title">
          <h3>DASHBOARD</h3>
        </div>
        <div className="searchbar_input">
          <SearchInput searchHandler={searchHandler} />
        </div>
        <div>
          <AccountCircleIcon />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelSearchBar;
