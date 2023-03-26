import React, { memo, useState } from "react";
import AdminList from "../common/AdminList/AdminList";
import AdminPanelNav from "../common/AdminPanelNav/AdminPanelNav";
import AdminPanelSearchBar from "../common/AdminPanelSearchBar/AdminPanelSearchBar";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../store/orders";
import Map from "../common/DeteledItemInfo/Map/Map";
import { DriverType, OrderType, TruckType } from "../../types/types";
import { clearDriverErrors, getAllDrivers } from "../../store/drivers";
import { clearTrucksErrors, getAllTrucks } from "../../store/trucks";
import DriverDeteledInfo from "../common/DeteledItemInfo/DriverDeteledInfo/DriverDeteledInfo";
import TruckDeteledInfo from "../common/DeteledItemInfo/TruckdeteledInfo/TruckDeteledInfo";
import AdminFilter from "../common/AdminFilter/AdminFilter";
import BasicModal from "../ui/Modal/Modal";
import AddDriverForm from "../ui/AddDriverForm/AddDriverForm";
import AddTuckForm from "../ui/AddTruckForm/AddTruckForm";
import { useAppDispatch } from "../../store";
import DeteledInfo from "../common/DeteledItemInfo/DeteledInfo";

const AdminPage: React.FC = memo(() => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({} as OrderType | DriverType | TruckType);
  const [filterIndex, setFilterIndex] = useState(0);
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(clearDriverErrors());
    dispatch(clearTrucksErrors());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [dataType, setDataType] = useState("orders");
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());

  const handleChangeFilterIndex = (
    event: React.SyntheticEvent,
    newValue: any
  ) => {
    setFilterIndex(newValue);
  };

  const setMapVissible = (data: OrderType) => {
    setLoad(true);
    setData(data);
  };
  const changeDataType = (dataType: string) => {
    setDataType(dataType);
    setLoad(false);
    setFilterIndex(0);
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

  const samplingDataEntity = () => {
    if (dataType === "orders") {
      const filteredOrders = genOrdersEntityByFilter();
      return { entity: filteredOrders, modal: null };
    } else if (dataType === "drivers") {
      const filteredDrivers = genDriversEntityByFilter();
      const driverModal = <AddDriverForm handleClose={handleClose} />;
      return { entity: filteredDrivers, modal: driverModal };
    } else {
      const truckModal = <AddTuckForm handleClose={handleClose} />;
      return { entity: trucks, modal: truckModal };
    }
  };

  const { entity, modal } = samplingDataEntity();

  return (
    <div className="admin_wrapper">
      <AdminPanelNav dataType={dataType} changeDataType={changeDataType} />
      <div className="admin_content">
        <AdminPanelSearchBar />
        <AdminFilter
          dataType={dataType}
          handleChange={handleChangeFilterIndex}
          value={filterIndex}
          handleOpenModal={handleOpen}
        />
        <div className="flex admin_content-wrapper">
          <AdminList
            onClickHandle={setMapVissible}
            dataType={dataType}
            data={entity}
          />
          {load ? <DeteledInfo data={data} dataType={dataType} /> : <div>waiting</div>}
        </div>
      </div>
      <BasicModal open={open} handleClose={handleClose}>
        <div>{!modal ? <></> : modal}</div>
      </BasicModal>
    </div>
  );
});

export default AdminPage;
