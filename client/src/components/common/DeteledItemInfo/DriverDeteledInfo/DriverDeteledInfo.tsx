import * as React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getDriverById } from "../../../../store/drivers";
import { DriverType } from "../../../../types/types";

type DriverInfoPropsType = {
  handleOpenModal: any;
};

const DriverDeteledInfo: React.FC<DriverInfoPropsType> = ({
  handleOpenModal
}) => {
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get("id");
  const driver = useSelector(getDriverById(+driverId!));

  const genDriverById = (driver: DriverType) => {
    if(driver) {
    return (
      <>
        <div className="flex align_center">
          <img src={`http://localhost:3007/${driver.photo}`} alt="driver img" />
          <div className="driverInfo_description flex flex_column justify-center">
            <h3>
              {driver.name} {driver.surname}
            </h3>
            <p>
              <b>Email</b>: {driver.email}
            </p>
            <p>
              <b>Age</b>: {driver.age} years old
            </p>
          </div>
        </div>
        <div className="driverInfo_truck">
          {!driver.truckId ? (
            <div className="notassgn flex justify-center">
              <p>
                <b> Truck </b> is not assign for {driver.name}
              </p>
              <button
                className="button"
                onClick={() => handleOpenModal(driver.id)}
              >
                Assign truck
              </button>
            </div>
          ) : (
            <>
              <h2 className="truck_title">Driver's truck info</h2>
              <div className="truck flex">
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
                    <b>Load capacity</b>: {driver.truckId.loadCapacity} years
                    old
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    ); }
  };

  const driverInfo = genDriverById(driver!);
  return (
    <div className="deteledInfo">
      <div className="deteledInfo_wrapper flex flex_column">
        <div className="driverInfo">
        {driver ? driverInfo : <h1>There is no driver with such Id</h1>}
        </div>
      </div>
    </div>
  );
};

export default DriverDeteledInfo;
