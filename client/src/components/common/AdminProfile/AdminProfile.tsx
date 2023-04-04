import * as React from "react";
import { useSelector } from "react-redux";
import { getAllDrivers } from "../../../store/drivers";
import { getAllOrders } from "../../../store/orders";
import { getAllTrucks } from "../../../store/trucks";
import DataTable from "../../ui/Table/Table";

type AdminProfileProps = {
  searchHandler: any
}

const AdminProfile: React.FC<AdminProfileProps> = ({searchHandler}) => {
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());

  return (
    <div className="adminprofile">
      <div className="adminprofile_gretting flex justify-center">
        <h1>Welcome to the Admin Panel</h1>
      </div>
      <div className="adminprofile_info">
        <div className="flex align_center">
          <div className="adminprofile_info-img">
            <img
              src="data:image/png;base64,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"
              alt="admin"
            />
          </div>
          <div className="adminprofile_info-creds"></div>
        </div>
        <div className="adminprofile_info-data">
          <h2>Orders</h2>
          <DataTable dataType={"orders"} rows={orders} searchHandler={searchHandler} />
          <h2>Drivers</h2>
          <DataTable dataType={"drivers"} rows={drivers} searchHandler={searchHandler} />
          <h2>Trucks</h2>
          <DataTable dataType={"trucks"} rows={trucks} searchHandler={searchHandler}/>
        </div>
        
      </div>
    </div>
  );
};

export default AdminProfile;
