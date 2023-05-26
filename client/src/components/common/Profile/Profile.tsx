import * as React from "react";
import { useSelector } from "react-redux";
import { getAuthUser, getRole } from "../../../store/user";
import driversService from "../../../services/drivers.service";
import { DriverType } from "../../../types/types";

const Profile = () => {
  const authUser = useSelector(getAuthUser());
  const role = useSelector(getRole());
  const [driver, setDriver] = React.useState({} as DriverType | null);

  React.useEffect(() => {
    if (role === "driver") {
      driversService
        .getDriverById(authUser!?.id)
        .then((data) => setDriver(data));
    }
  }, [authUser, role]);

  const genDriverInfo = () => {
    if (driver) {
      return (
        <div className="driverInfo">
          <div className="driverInfo_data">
            <img
              src={`http://localhost:3007/${driver.photo}`}
              alt="driver img"
            />
            <img
              src={`http://localhost:3007/${driver.docs_img}`}
              alt="driver img"
            />
            <div className="driverInfo_description flex flex_column justify-center">
              <h3>
                {driver.name} {driver.surname}
              </h3>
              <p>
                <b>Email</b>: {driver.email}
              </p>
              <p>
                <b>Driving Experience</b>: {driver.driving_experience} years
              </p>
            </div>
          </div>
          <div className="driverInfo_truck">
            {!driver.truckId ? (
              <div className="notassgn flex justify-center">
                <p>
                  <b> Truck </b> is not assign for {driver.name}
                </p>
              </div>
            ) : (
              <>
                <h2 className="truck_title">Driver's truck info</h2>
                <div className="truck">
                  <img
                    src={`http://localhost:3007/${driver.truckId.photo}`}
                    alt="driver img"
                  />
                  <div className="driverInfo_description flex flex_column justify-center">
                    <h3>
                      Name: {driver.truckId.name} {driver.truckId.model}
                    </h3>
                    <p>
                      <b>Year of issue</b>: {driver.truckId.year} years old
                    </p>
                    <p>
                      <b>Load capacity</b>: {driver.truckId.loadCapacity} tons
                      old
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  };

  const driverInfo = genDriverInfo();
  console.log(role)

  return (
    <div className="flex flex_column justify-center align_center mt-30">
      <h2 className="mg-btm-20">Welcome to your profile page</h2>

      {role === "driver" ? (
        driverInfo
      ) : (
        <>
          <div className="flex align_center">
            <p>
              <b>Email</b> {authUser?.email}
            </p>
          </div>
          <div className="flex align_center">
            <p>
              <b>Role</b> {authUser?.role}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
