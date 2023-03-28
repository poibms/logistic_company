import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { getDriversLoadingStatus, loadDrivers } from '../../store/drivers';
import { getOrdersLoadingStatus, loadOrders } from '../../store/orders';
import { getTrucksLoadingStatus, loadTrucks } from '../../store/trucks';
import { isAdmin } from '../../store/user';

const AppLoader = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const isAuthAdmin = useSelector(isAdmin());
  const ordersStatusLoading = useSelector(getOrdersLoadingStatus());
  const driverStatusLoading = useSelector(getDriversLoadingStatus());
  const trucksStatusLoading = useSelector(getTrucksLoadingStatus());

  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadDrivers());
    dispatch(loadTrucks());
  }, [dispatch, isAuthAdmin]);

  if (!ordersStatusLoading && !driverStatusLoading && !trucksStatusLoading) {
    return children;
  } else {
    return <></>;
  }
};

export default AppLoader;
