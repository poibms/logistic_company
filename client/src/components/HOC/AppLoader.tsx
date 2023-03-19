import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDrivers } from '../../store/drivers';
import { getOrdersLoadingStatus, loadOrders } from '../../store/orders';
import { loadTrucks } from '../../store/trucks';
import { isAdmin } from '../../store/user';

const AppLoader = ({ children }: any) => {
  const dispatch = useDispatch();
  const isAuthAdmin = useSelector(isAdmin());
  const ordersStatusLoading = useSelector(getOrdersLoadingStatus());

  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadDrivers());
    dispatch(loadTrucks());
  }, [dispatch, isAuthAdmin]);

  if (!ordersStatusLoading) {
    return children;
  } else {
    return <></>;
  }
};

export default AppLoader;
