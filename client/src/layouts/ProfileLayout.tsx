import * as React from "react";
import Header from "../components/common/Header/Header";
import ProfilePage from "../components/pages/ProfilePage";
import { useAppDispatch } from "../store";
import { getUserOrders } from "../store/orders";

const ProfileLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUserOrders())
  }, [])
  return (
    <>
      <Header />
      <ProfilePage />
    </>
  );
};

export default ProfileLayout;
