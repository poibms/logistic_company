import * as React from "react";
import { DriverType, OrderType, TruckType } from "../../../types/types";
import AssignTruckForm from "../../ui/AssignTruckForm/AssignTruckForm";
import BasicModal from "../../ui/Modal/Modal";
import DriverDeteledInfo from "./DriverDeteledInfo/DriverDeteledInfo";
import Map from "./Map/Map";
import TruckDeteledInfo from "./TruckdeteledInfo/TruckDeteledInfo";

type DeteledPropsType = {
  dataType: URLSearchParams;
  data: DriverType | OrderType | TruckType;
};

const DeteledInfo: React.FC<DeteledPropsType> = ({ dataType, data }) => {
  const [open, setOpen] = React.useState(false);
  const [driverId, setDriverId] = React.useState("");

  const handleOpen = (id: string) => {
    setDriverId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const genDeteledComponent = () => {
    if (dataType.get("filter") === "drivers") {
      const info = <DriverDeteledInfo handleOpenModal={handleOpen} />;
      const modal = (
        <AssignTruckForm driverId={driverId} handleClose={handleClose} />
      );

      return { deteledInfo: info, modal };
    } else if (dataType.get("filter") === "orders") {
      const map = <Map />;
      return { deteledInfo: map, modal: null };
    } else {
      const info = <TruckDeteledInfo/>;
      return { deteledInfo: info, modal: null };
    }
  };

  const { deteledInfo, modal } = genDeteledComponent();

  return (
    <>
      {deteledInfo}
      <BasicModal open={open} handleClose={handleClose}>
        <div>{!modal ? <></> : modal}</div>
      </BasicModal>
    </>
  );
};

export default DeteledInfo;
