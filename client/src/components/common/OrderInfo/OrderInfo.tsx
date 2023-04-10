import { Container } from "@mui/system";
import * as React from "react";
import { useLocation } from "react-router-dom";
import ordersService from "../../../services/orders.service";
import { OrderType } from "../../../types/types";
import Header from "../Header/Header";

const OrderInfo: React.FC = () => {
  const [order, setOrder] = React.useState({} as OrderType | null);
  const [error, setError] = React.useState("");
  const location = useLocation();
  const trackCode = location.pathname.split("order/")[1];


  React.useEffect(() => {
    ordersService.getOrderByTrackCode(trackCode).then((data) => setOrder(data)).catch((error) => setError(error))
  }, [trackCode])

  const configureOrder = () => {
    if(order) {
      return (
        <div className="orderinfo">
          <div>
            <img src={`http://localhost:3007/${order.image}`} alt="item img" />
          </div>
          <div>
            <strong>Name</strong>: {order.name}
          </div>
          <div>
            <strong>From</strong>: {order.from}
          </div>
          <div>
            <strong>To</strong>: {order.to}
          </div>
          <div>
          <strong>Weight</strong>: {order.weight} tons
          </div>
        </div>
      )
    }
  }

  const configuredOrder = configureOrder();

  return (
    <>
      <Header />
      <Container>
        {trackCode ? error ? <h3>Something was wrong! Check your track code and try again</h3> : configuredOrder : <>Set track code to find info about your order</>}
        {}
      </Container>
    </>
  );
};

export default OrderInfo;
