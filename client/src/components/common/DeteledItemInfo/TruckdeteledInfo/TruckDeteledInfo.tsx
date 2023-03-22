import * as React from "react";
import { TruckType } from "../../../../types/types";

type TruckInfoPropsType = {
  truck: TruckType;
};

const TruckDeteledInfo: React.FC<TruckInfoPropsType> = ({ truck }) => {
  return (
    <div className="deteledInfo">
      <div className="deteledInfo_wrapper flex flex_column">
        <div className="driverInfo">
          <div className="flex align_center">
            <img
              src={`http://localhost:3007/${truck.photo}`}
              alt="driver img"
            />
            <div className="driverInfo_description flex flex_column justify-center">
              <h3>
                Name: {truck.name} {truck.model}
              </h3>
              <p>
                <b>Year of issue</b>: {truck.year} years old
              </p>
              <p>
                <b>Load capacity</b>: {truck.loadCapacity} years old
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDeteledInfo;
