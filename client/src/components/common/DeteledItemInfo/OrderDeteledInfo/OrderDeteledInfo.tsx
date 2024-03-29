import { Button } from "@mui/material";
import * as React from "react";
import { OrderType } from "../../../../types/types";
import OrderAdminPanel from "../OrderAdminPanel/OrderAdminPanel";

type ItemInfoPropsType = {
  order: OrderType;
  handleOpenModal: any;
  handleOpenPanel: any
};

const OrderDeteledInfo: React.FC<ItemInfoPropsType> = ({ order, handleOpenModal, handleOpenPanel }) => {

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
                {order.driverId ? order.driverId.name : <Button className="button"
                onClick={() => handleOpenModal(order.id)}>Assign driver</Button>}
              </td>
              <td>{order.status}</td>
              <td>{order.to}</td>
            </tr>
          </tbody>
        </table>
        <div className="itemlist_moredetails">
        <button className="small-button" onClick={() => handleOpenPanel(true)}>See more details...</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDeteledInfo;
