import * as React from "react";
import { TruckType } from "../../../../types/types";

type TrucksItemPropsType = {
  trucks: TruckType;
};

const TrucksItem: React.FC<TrucksItemPropsType> = ({ trucks }) => {
  return (
    <>
      <div className="listitem_inner flex listitem_inner-img">
        <img src={`http://localhost:3007/${trucks.photo}`} alt="item img" />
      </div>
      <div className="listitem_inner flex flex_column align_left">
        <div className="item_title">
          <p>{`${trucks.name} ${trucks.model}`}</p>
        </div>
        <div className="item_text">
          <p>Year of issue: {trucks.year}</p>
        </div>
        <div className="item_text">
          <p>Load capacity: {trucks.loadCapacity}</p>
        </div>
      </div>
    </>
  );
};

export default TrucksItem;