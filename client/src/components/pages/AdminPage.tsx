import React, { memo, useEffect, useState } from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../store/orders";
import { DriverType, OrderType, TruckType } from "../../types/types";
import { clearDriverErrors, getAllDrivers } from "../../store/drivers";
import { clearTrucksErrors, getAllTrucks } from "../../store/trucks";
import AdminFilter from "../common/AdminFilter/AdminFilter";
import BasicModal from "../ui/Modal/Modal";
import AddDriverForm from "../ui/AddDriverForm/AddDriverForm";
import AddTuckForm from "../ui/AddTruckForm/AddTruckForm";
import { useAppDispatch } from "../../store";
import DeteledInfo from "../common/DeteledItemInfo/DeteledInfo";
import { useSearchParams } from "react-router-dom";

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState({} as OrderType | DriverType | TruckType);
  const [filterIndex, setFilterIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [queryParams, setQueryParams] = useSearchParams('orders')
  // const [dataType, setDataType] = useState("orders");
  const id = queryParams.get('id');
  useEffect(() => {
    if (!id) setLoad(false)
  }, [id])

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(clearDriverErrors());
    dispatch(clearTrucksErrors());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());

  const handleChangeFilterIndex = (
    event: React.SyntheticEvent,
    newValue: any
  ) => {
    setFilterIndex(newValue);
  };

  const setDeteledInfoVissible = (data: OrderType) => {
    setQueryParams({filter: String(queryParams.get('filter')), id: String(data.id)});
    setLoad(true);
    setData(data);
  };
  const changeDataType = (dataType: string) => {
    setLoad(false);
    setFilterIndex(0);
    setQueryParams({filter: dataType});
  };

  const genOrdersEntityByFilter = () => {
    switch (filterIndex) {
      case 0:
        return orders.filter((order) => order.status === "not_assigned");
      case 1:
        return orders.filter((order) => order.status === "in_progress");
      case 2:
        return orders.filter((order) => order.status === "done");
      default:
        return orders.filter((order) => order.status === "not_assigned");
    }
  };

  const genDriversEntityByFilter = () => {
    switch (filterIndex) {
      case 0:
        return drivers.filter((order) => order.truckId === null);
      case 1:
        return drivers.filter((order) => order.truckId !== null);
      default:
        return drivers.filter((order) => order.truckId === null);
    }
  };

  const genTrucksEntityByFilter = () => {
    switch (filterIndex) {
      case 0:
        return trucks.filter((truck) => truck.driverId === null);
      case 1:
        return trucks.filter((truck) => truck.driverId !== null);
      default:
        return trucks.filter((truck) => truck.driverId === null);
    }
  };

  const samplingDataEntity = () => {
    if (queryParams.get('filter') === "orders") {
      const filteredOrders = genOrdersEntityByFilter();
      return { entity: filteredOrders, modal: null };
    } else if (queryParams.get('filter') === "drivers") {
      const filteredDrivers = genDriversEntityByFilter();
      const driverModal = <AddDriverForm handleClose={handleClose} />;
      return { entity: filteredDrivers, modal: driverModal };
    } else {
      const filteredTrucks = genTrucksEntityByFilter();
      const truckModal = <AddTuckForm handleClose={handleClose} />;
      return { entity: filteredTrucks, modal: truckModal };
    }
  };

  const searchHandler = (event:React.SyntheticEvent, value:any) => {
    if(orders.includes(value)) {
      const filter = value.status === "not_assigned" ? 0 : value.status === "in_progress" ? 1 : 2
      setQueryParams({filter: 'orders', id: value.id})
      setFilterIndex(filter)
    } else if (drivers.includes(value)) {
      const filter = !value.truckId ? 0 : 1
      setQueryParams({filter: 'drivers', id: value.id})
      setFilterIndex(filter)
    } else {
      const filter = !value.driverId ? 0 : 1
      setQueryParams({filter: 'trucks', id: value.id})
      setFilterIndex(filter)
    }
  }

  const { entity, modal } = samplingDataEntity();

  return (
    <div className="admin_wrapper">
      <AdminPanelNav queryParams={queryParams} changeDataType={changeDataType} />
      <div className="admin_content">
        <AdminPanelSearchBar searchHandler={searchHandler} />
        <AdminFilter
          dataType={queryParams}
          handleChange={handleChangeFilterIndex}
          value={filterIndex}
          handleOpenModal={handleOpen}
        />
        <div className="flex admin_content-wrapper">
          <AdminList
            onClickHandle={setDeteledInfoVissible}
            dataType={queryParams}
            data={entity}
          />
          {load? (
            <DeteledInfo data={data} dataType={queryParams} />
          ) : (
            <div>waiting</div>
          )}
        </div>
      </div>
      <BasicModal open={open} handleClose={handleClose}>
        <div>{!modal ? <></> : modal}</div>
      </BasicModal>
    </div>
  );
});

export default AdminPage;

