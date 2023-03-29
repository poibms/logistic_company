import * as React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getTruckById } from "../../../../store/trucks";


const TruckDeteledInfo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const truckId = searchParams.get("id");
  const truck = useSelector(getTruckById(+truckId!));

  return (
    <div className="deteledInfo">
      <div className="deteledInfo_wrapper flex flex_column">
        <div className="driverInfo">
          {truck ? 
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
                <b>Load capacity</b>: {truck.loadCapacity} tons
              </p>
            </div>
          </div>
          : <h1>There is no truck with such Id</h1>}
        </div>
      </div>
    </div>
  );
};

export default TruckDeteledInfo;
