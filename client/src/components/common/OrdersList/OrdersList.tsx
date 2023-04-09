import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthOrders } from "../../../store/orders";

const OrderList = () => {
  const currUser = useSelector(getAuthOrders());
  const navigate = useNavigate();

  const genCards = () => {
    return currUser.map((order) => (
      <Card sx={{ maxWidth: 345 }} key={order.id}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`http://localhost:3007/${order.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {order.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Weight</strong>: {order.weight} tons
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>From</strong>: {order.from}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>To</strong>: {order.to}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Status</strong>: {order.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`/order/${order.track_code}`)}>Open Order</Button>
        </CardActions>
      </Card>
    ));
  };

  const ordersCard = genCards();

  return (
    <div className="orderlist">
      <div className="orderlist_title">
        <h2>Orders</h2>
      </div>

      <div className="orderlist_wrapper">
        {/*   <div className="orderlist_item">
          <div className="orderlist_item-img">
            <img src={`http://localhost:3007/${currUser[0].image}`} alt="item img" />
          </div>
        </div>
        */}
        {ordersCard}

      </div>
    </div>
  );
};

export default OrderList;
