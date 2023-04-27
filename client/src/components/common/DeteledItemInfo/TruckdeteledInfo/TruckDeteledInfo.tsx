import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../store";
import { deleteTruckById, getTruckById } from "../../../../store/trucks";
import BasicModal from "../../../ui/Modal/Modal";
import UpdateTruckForm from "../../../ui/UpdateTruckForm/UpdateTruckForm";

const TruckDeteledInfo: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const truckId = searchParams.get("id");
  const truck = useSelector(getTruckById(+truckId!));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteTruck = (id: number) => {
    dispatch(deleteTruckById(id, navigate("/adminpanel?filter=trucks")));
  };

  const genDeleteButon = () => {
    if (truck) {
      if (!truck?.driverId ) {
        return (
          <>
            <button className="button" onClick={() => deleteTruck(truck.id)}>
              Delete driver
            </button>
          </>
        );
      }
    }
  };

  const deleteButton = genDeleteButon();
  return (
    <div className="deteledInfo">
      <div className="deteledInfo_wrapper flex flex_column">
        <div className="driverInfo">
          {truck ? (
            <div className="flex align_center">
              <img
                src={`http://localhost:3007/${truck.photo}`}
                alt="driver img"
              />
              <div className="driverInfo_description flex flex_column justify-center">
                <h3>
                  Name: {truck.name} {truck.model}
                </h3>
                <p>
                  <b>Year of issue</b>: {truck.year} years old
                </p>
                <p>
                  <b>Load capacity</b>: {truck.loadCapacity} tons
                </p>
              </div>
              {/* {truckButton} */}
              <div className="driverInfo_buttons flex justify-center">
                {deleteButton}
                <button className="button" onClick={handleOpen}>
                  {" "}
                  Update Truck
                </button>
              </div>
            </div>
          ) : (
            <h1>There is no truck with such Id</h1>
          )}
        </div>
      </div>
      <BasicModal open={open} handleClose={handleClose}>
        <UpdateTruckForm truck={truck!} handleClose={handleClose} />
      </BasicModal>
    </div>
  );
};

export default TruckDeteledInfo;
