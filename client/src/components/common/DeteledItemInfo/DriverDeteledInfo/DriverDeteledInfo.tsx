import * as React from "react";
import { DriverType } from "../../../../types/types";

type DriverInfoPropsType = {
  driver: DriverType;
};

const DriverDeteledInfo: React.FC<DriverInfoPropsType> = ({ driver }) => {
  return (
    <div className="deteledInfo">
      <div className="deteledInfo_wrapper flex flex_column">
        <div className="driverInfo">
          <div className="flex align_center">
            <img
              src={`http://localhost:3007/${driver.photo}`}
              alt="driver img"
            />
            <div className="driverInfo_description flex flex_column justify-center">
              <h3>
                {driver.name} {driver.surname}
              </h3>
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
                <button className="button">Assign truck</button>
              </div>
            ) : (
              <>
                <h2 className="truck_title">Driver's truck info</h2>
                <div className="truck flex">
                  <img src={`http://localhost:3007/${driver.truckId.photo}`} />
                  <div className="driverInfo_description flex flex_column justify-center">
                    <h3>
                      Name: {driver.truckId.name} {driver.truckId.model}
                    </h3>
                    <p>
                      <b>Year of issue</b>: {driver.truckId.year} years old
                    </p>
                    <p>
                      <b>Load capacity</b>: {driver.truckId.loadCapacity} years old
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDeteledInfo;
