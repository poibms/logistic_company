import { Container } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ordersService from "../../../services/orders.service";
import { useAppDispatch } from "../../../store";
import { completeOrder } from "../../../store/orders";
import { getIsLoggedIn, getRole } from "../../../store/user";
import { OrderType } from "../../../types/types";
import Header from "../Header/Header";

const OrderInfo: React.FC = () => {
  const [order, setOrder] = React.useState({} as OrderType | null);
  const [error, setError] = React.useState("");
  const location = useLocation();
  const trackCode = location.pathname.split("order/")[1];
  const isAuth = useSelector(getIsLoggedIn());
  const role = useSelector(getRole());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    ordersService
      .getOrderByTrackCode(trackCode)
      .then((data) => setOrder(data))
      .catch((error) => setError(error));
  }, [trackCode]);

  const handleCompleteOrder = (id: number) => {
    dispatch(completeOrder(id, () => navigate('/profile')))
  };

  const configureOrder = () => {
    if (order) {
      return (
        <div className="flex flex_column">
          <div className="orderinfo flex justify-spacearnd">
            <div className="orderinfo_img">
              <img
                src={`http://localhost:3007/${order.image}`}
                alt="item img"
              />
            </div>
            <div className="orderinfo_desc">
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
              <div>
                <strong>Volume</strong>: {order.volume} tons
              </div>
              <div>
                <strong>Distance</strong>: {order.distance} km
              </div>
              <div>
                <strong>Status</strong>: {order.status}
              </div>
            </div>
            <div className="flex align_center">
              {isAuth ? (
                role === "driver" ? (
                  order.status !== "done" ? (
                    <button
                      className="button"
                      onClick={() => handleCompleteOrder(order.id)}
                    >
                      Order complete
                    </button>
                  ) : null
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  };

  const configuredOrder = configureOrder();

  return (
    <>
      <Header />
      <Container>
        {trackCode ? (
          error ? (
            <h3>Something was wrong! Check your track code and try again</h3>
          ) : (
            configuredOrder
          )
        ) : (
          <>Set track code to find info about your order</>
        )}
        {}
      </Container>
    </>
  );
};

export default OrderInfo;
