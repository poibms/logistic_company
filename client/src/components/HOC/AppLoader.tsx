import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersLoadingStatus, loadOrders } from '../../store/orders';
import { isAdmin } from '../../store/user';

const AppLoader = ({ children }: any) => {
  const dispatch = useDispatch();
  const isAuthAdmin = useSelector(isAdmin());
  const ordersStatusLoading = useSelector(getOrdersLoadingStatus());

  useEffect(() => {
    dispatch(loadOrders());
  }, [isAuthAdmin]);

  if (!ordersStatusLoading) {
    return children;
  } else {
    return <></>;
  }
};

export default AppLoader;
