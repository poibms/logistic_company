import * as React from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Header/Header";
import ProfilePage from "../components/pages/ProfilePage";
import { useAppDispatch } from "../store";
import { getDriverOrders, getUserOrders } from "../store/orders";
import { getRole } from "../store/user";

const ProfileLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const role = useSelector(getRole());
  React.useEffect(() => {
    if(role === 'driver') {
      dispatch(getDriverOrders())
    } else {
      dispatch(getUserOrders())
    }
  }, [])
  return (
    <>
      <Header />
      <ProfilePage />
    </>
  );
};

export default ProfileLayout;
