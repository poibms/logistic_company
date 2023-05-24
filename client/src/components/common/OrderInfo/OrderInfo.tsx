import { Container } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import driversService from "../../../services/drivers.service";
import ordersService from "../../../services/orders.service";
import { getAuthUser, getIsLoggedIn, getRole } from "../../../store/user";
import { DriverType, OrderStatus, OrderType } from "../../../types/types";
import CompleteOrderForm from "../../ui/CompleteOrderForm/CompleteOrderForm";
import BasicModal from "../../ui/Modal/Modal";
import Header from "../Header/Header";

const OrderInfo: React.FC = () => {
  const [order, setOrder] = React.useState({} as OrderType | null);
  const [driver, setDriver] = React.useState({} as DriverType | null);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const trackCode = location.pathname.split("order/")[1];
  const isAuth = useSelector(getIsLoggedIn());
  const authUser = useSelector(getAuthUser());
  const role = useSelector(getRole());
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  React.useEffect(() => {
    ordersService
      .getOrderByTrackCode(trackCode)
      .then((res) => setOrder(res.data))
      .catch((res) => setError(res));

    if (role === "driver") {
      driversService
        .getDriverById(authUser!.id)
        .then((data) => setDriver(data));
    }
  }, [trackCode, authUser, role]);

  // const handleCompleteOrder = (id: number) => {
  //   dispatch(completeOrder(id, () => navigate('/profile')))
  // };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const configureOrder = () => {
    if (order) {
      return (
        <div className="flex flex_column">
          <div className="orderinfo">
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
              {order.status === OrderStatus.CANCELED ? (
                <div>
                  <strong>Error message</strong>: {order.err_message}
                </div>
              ) : (
                <></>
              )}
              <div>
                <strong>Price</strong>: {order.price} BYN
              </div>
              <div>
                <strong>Date of the Order</strong> {order.date_of_the_order}
              </div>
              <div>
                <strong>Expected delivery date</strong>{" "}
                {order.expected_delivery_date}
              </div>
              {order.actual_delivery_date ? (
                <div>
                  <strong>Actual delivery date</strong>{" "}
                  {order.actual_delivery_date}
                </div>
              ) : (
                <></>
              )}
              <div>
                <strong>Fuel</strong> {order.fuel} liters
              </div>
            </div>
            <div className="flex align_center">
              {isAuth ? (
                role === "driver" ? (
                  order.status !== "done" ? (
                    <button className="button" onClick={handleOpen}>
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

      <BasicModal open={open} handleClose={handleClose}>
        {order && driver && role === "driver" ? (
          <CompleteOrderForm order={order} driver={driver} />
        ) : (
          <></>
        )}
      </BasicModal>
    </>
  );
};

export default OrderInfo;
