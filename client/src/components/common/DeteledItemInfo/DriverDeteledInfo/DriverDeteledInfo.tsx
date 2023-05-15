import * as React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../store";
import { deleteDriverById, getDriverById, unSetDriverToTruck } from "../../../../store/drivers";
import { DriverType } from "../../../../types/types";
import BasicModal from "../../../ui/Modal/Modal";
import UpdateDriverForm from "../../../ui/UpdateDriverForm/UpdateDriverForm";

type DriverInfoPropsType = {
  handleOpenModal: any;
};

const DriverDeteledInfo: React.FC<DriverInfoPropsType> = ({
  handleOpenModal,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const driverId = searchParams.get("id");
  const driver = useSelector(getDriverById(+driverId!));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteDriver = (id: number) => {
    dispatch(deleteDriverById(id));
    searchParams.delete("id");
    setSearchParams(searchParams);
  };

  const unSetTruck = (driver: DriverType) => {
    dispatch(unSetDriverToTruck({driverId: String(driver.id), truckId: String(driver.truckId?.id)}));
    searchParams.delete("id");
    setSearchParams(searchParams);
  };

  const genDriverById = (driver: DriverType) => {
    if (driver) {
      let numOfInProgressOrders = [];
      if (driver.orders) {
        numOfInProgressOrders = driver.orders.filter(
          (order) => order.status === "in_progress"
        );
      }
      return (
        <div className="driverInfo">
          <div className="driverInfo_data">
            <img
              src={`http://localhost:3007/${driver.photo}`}
              alt="driver img"
            />
            <div className="driverInfo_description flex flex_column justify-center">
              <h3>
                {driver.name} {driver.surname}
              </h3>
              <p>
                <b>Email</b>: {driver.email}
              </p>
              <p>
                <b>Age</b>: {driver.age} years old
              </p>
            </div>
          </div>
          <div className="driverInfo_truck">
            {!driver.truckId ? (
              <div className="notassgn flex justify-center">
                <p>
                  <b> Truck </b> is not assign for {driver.name}
                </p>
                <button
                  className="button"
                  onClick={() => handleOpenModal(driver.id)}
                >
                  Assign truck
                </button>
              </div>
            ) : (
              <>
                <h2 className="truck_title">Driver's truck info</h2>
                <div className="truck">
                  <img
                    src={`http://localhost:3007/${driver.truckId.photo}`}
                    alt="driver img"
                  />
                  <div className="driverInfo_description flex flex_column justify-center">
                    <h3>
                      Name: {driver.truckId.name} {driver.truckId.model}
                    </h3>
                    <p>
                      <b>Year of issue</b>: {driver.truckId.year} years old
                    </p>
                    <p>
                      <b>Load capacity</b>: {driver.truckId.loadCapacity} years
                      old
                    </p>
                  </div>
                  <div className="flex align_center">
                    {numOfInProgressOrders.length === 0 ? (
                      <button
                        className="button"
                        onClick={() => unSetTruck(driver)}
                      >
                        Remove Truck
                      </button>
                    ) : null}
                  </div>
                </div>
              </>
            )}
            <div className="driverInfo_buttons flex justify-center">
              {numOfInProgressOrders.length === 0 ? (
                <button
                  className="button"
                  onClick={() => deleteDriver(driver.id)}
                >
                  Delete driver
                </button>
              ) : null}
              <button className="button" onClick={handleOpen}>
                Update Driver
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const driverInfo = genDriverById(driver!);
  return (
    <div className="deteledInfo">
      <div className="deteledInfo_wrapper flex flex_column">
          {driver ? driverInfo : <h1>There is no driver with such Id</h1>}
      </div>
      <BasicModal open={open} handleClose={handleClose}>
        <UpdateDriverForm driver={driver!} handleClose={handleClose} />
      </BasicModal>
    </div>
  );
};

export default DriverDeteledInfo;
