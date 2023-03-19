import * as React from "react";
import { DriverType } from "../../../../types/types";

type DriversItemPropsType = {
  driver: DriverType;
};

const DriversItem: React.FC<DriversItemPropsType> = ({ driver }) => {
  return (
    <>
      <div className="listitem_inner flex listitem_inner-img">
        <img src={`http://localhost:3007/${driver.photo}`} alt="item img" />
      </div>
      <div className="listitem_inner flex flex_column align_left">
        <div className="item_title">
          <p>{`${driver.name} ${driver.surname}`}</p>
        </div>
        <div className="item_text">
          <p>Age: {driver.age}</p>
        </div>
        {driver.truckId ? 
          <div className="item_text">
            <p>Truck ${driver.truckId}</p>
          </div>
          : <p><b>Truck</b> is not assign</p>}
      </div>
    </>
  );
};

export default DriversItem;