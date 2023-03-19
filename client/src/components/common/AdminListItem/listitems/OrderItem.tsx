import * as React from "react";
import { OrderType } from "../../../../types/types";

type OrderItemPropsType = {
  order: OrderType;
};

const OrdersItem: React.FC<OrderItemPropsType> = ({ order }) => {
  return (
    <>
      <div className="listitem_inner flex listitem_inner-img">
        <img src={`http://localhost:3007/${order.image}`} alt="item img" />
      </div>
      <div className="listitem_inner flex flex_column align_left">
        <div className="item_title">
          <p>{order.cargo_name}</p>
        </div>
        <div className="item_text">
          <p>Откуда: {order.from}</p>
        </div>
        <div className="item_text">
          <p>Куда: {order.to}</p>
        </div>
        <div className="item_text">
          <p>Вес: {order.weight} т</p>
        </div>
      </div>
    </>
  );
};

export default OrdersItem;
