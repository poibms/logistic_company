import { Button } from "@mui/material";
import * as React from "react";
import { OrderType } from "../../../../types/types";

type ItemInfoPropsType = {
  order: OrderType;
};

const OrderDeteledInfo: React.FC<ItemInfoPropsType> = ({ order }) => {
  console.log(order);
  return (
    <div className="itemlist">
      <div className="itemlist_wrapper">
        <table>
          <thead>
            <tr>
              <th>Name of cargo</th>
              <th>driver</th>
              <th>Status</th>
              <th>Delivery adress</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.name}</td>
              <td>
                {order.driverId ? order.driverId : <Button>Assign driver</Button>}
              </td>
              <td>{order.status}</td>
              <td>{order.to}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDeteledInfo;
