import * as React from "react";
import { DriverType, OrderType, TruckType } from "../../../types/types";
import DriversItem from "./listitems/DriverItem";
import OrdersItem from "./listitems/OrderItem";
import TrucksItem from "./listitems/TruckItem";

type ListItemPropsType = {
  data: OrderType | DriverType | TruckType;
  dataType: string;
  onClickHandle: any;
};

const AdminListItem: React.FC<ListItemPropsType> = ({
  data,
  dataType,
  onClickHandle,
}) => {
  const genListItem = () => {
    if (dataType === 'orders') {
      return <OrdersItem order={(data as OrderType)}/>
    } else if (dataType === 'drivers') {
      return <DriversItem driver={(data as DriverType)}/>
    } else {
      return <TrucksItem trucks={(data as TruckType)}/>
    }
  };

  const listItemData = genListItem();

  return (
    <div className="listitem flex align_center justify_center">
      <div className="listitem_wrapper ">
        <div className="flex align_center" onClick={() => onClickHandle(data)}>
          {listItemData}
        </div>
      </div>
    </div>
  );
};

export default AdminListItem;
