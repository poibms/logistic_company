import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { loadDrivers } from '../../store/drivers';
import { getOrdersLoadingStatus, loadOrders } from '../../store/orders';
import { loadTrucks } from '../../store/trucks';
import { isAdmin } from '../../store/user';

const AppLoader = ({ children }: any) => {
  const dispatch = useAppDispatch();
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
