import * as React from "react";
import { DriverType, OrderType } from "../../../types/types";
import DriversItem from "./listitems/DriverItem";
import OrdersItem from "./listitems/OrderItem";

type ListItemPropsType = {
  order: OrderType | DriverType;
  dataType: string;
  onClickHandle: any;
};

const AdminListItem: React.FC<ListItemPropsType> = ({
  order,
  dataType,
  onClickHandle,
}) => {
  const genListItem = () => {
    if (dataType === 'orders') {
      return <OrdersItem order={(order as OrderType)}/>
    } else {
      return <DriversItem driver={(order as DriverType)}/>
    }
  };

  const listItemData = genListItem();

  return (
    <div className="listitem flex align_center justify_center">
      <div className="listitem_wrapper ">
        <div className="flex align_center" onClick={() => onClickHandle(order)}>
          {listItemData}
        </div>
      </div>
    </div>
  );
};

export default AdminListItem;
