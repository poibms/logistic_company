import * as React from "react";
import { OrderType } from "../../../../types/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch } from "../../../../store";
import { cancelOrder } from "../../../../store/orders";

type OrderPanel = {
  order: OrderType;
  handleClosePanel: any;
};

const OrderAdminPanel: React.FC<OrderPanel> = ({ order, handleClosePanel }) => {
  const dispatch = useAppDispatch();
  const driverUi = () => {
    console.log(order.driverId);
    if (order.driverId) {
      return (
        <div>
          <h3>DriverInfo</h3>
          <div>
            <strong>Driver Name</strong>: {order.driverId.name}{" "}
          </div>
          <div>
            <strong>Driver Surname</strong>: {order.driverId.surname}{" "}
          </div>
          <div>
            <strong>Driver Email</strong>: {order.driverId.email}{" "}
          </div>
        </div>
      );
    } else {
      return <h2>This order is not assign yet</h2>;
    }
  };

  const canselOrder = () => {
    dispatch(cancelOrder(order.id));
  };

  const driverInfo = driverUi();

  return (
    <div className="orderpanel">
      <div className="orderpanel_wrapper">
        <div className="orderpanel_title">
          <button onClick={() => handleClosePanel(false)}>
            <ArrowBackIcon />
          </button>
        </div>
        <div className="orderpanel_info">
          <div className="flex orderpanel_img">
            <img
              src={`http://localhost:3007/${order.image}`}
              alt="order pictr"
            />
          </div>
          <div className="flex_column">
            <div>
              <strong>Name</strong>: {order.name}
            </div>
            <div>
              <strong>Weight</strong> {order.weight} tons
            </div>
            <div>
              <strong>Volime</strong> {order.volume} cm3
            </div>
            <div>
              <strong>From</strong> {order.from}
            </div>
            <div>
              <strong>To</strong> {order.to}
            </div>
            <div>
              <strong>Status</strong> {order.status}
            </div>
            <div>
              <strong>Cargo type</strong> {order.cargo_type}
            </div>
            <div>
              <strong>Distace</strong> {order.distance} km
            </div>
            <div>
              <strong>Price</strong> {order.price} BYN
            </div>
            <div className="flex orderpanel_owner align_center">
              <div className="orderpanel_owner-title">
                <strong>Owner</strong>
              </div>
              <div className="flex flex_column">
                <p>Name: {order.ownerId.name}</p>
                <p>Surname: {order.ownerId.surname}</p>
                <p>Phone: {order.ownerId.phone}</p>
                <p>Email: {order.ownerId.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="orderpanel_driver">{driverInfo}</div>
        <div className="orderpanel_buttons">
          {order.status === "not_assigned" ? (
            <button className="button-cancel" onClick={canselOrder}>
              Cancel order
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderAdminPanel;
