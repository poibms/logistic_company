import * as React from 'react';
import { DriverType, OrderType, TruckType } from '../../../types/types';
import AssignTruckForm from '../../ui/AssignTruckForm/AssignTruckForm';
import BasicModal from '../../ui/Modal/Modal';
import DriverDeteledInfo from './DriverDeteledInfo/DriverDeteledInfo';
import Map from './Map/Map';
import TruckDeteledInfo from './TruckdeteledInfo/TruckDeteledInfo';

type DeteledPropsType = {
  dataType: string,
  data: DriverType | OrderType | TruckType;
}

const DeteledInfo: React.FC<DeteledPropsType> = ({dataType, data}) => {
  const [open, setOpen] = React.useState(false);
  const [driverId, setDriverId] = React.useState('');

  const handleOpen = (id: string) => {
    setDriverId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const genDeteledComponent = () => {
    if(dataType === 'drivers') {
      const info = (
        <DriverDeteledInfo
          driver={data as DriverType}
          handleOpenModal={handleOpen}
        />
      );
      const modal = <AssignTruckForm driverId={driverId} handleClose={handleClose}/>

      return {deteledInfo: info, modal}
    } else if (dataType === 'orders') {
      const map = <Map data={data as OrderType} />;
      return {deteledInfo: map, modal: null}
    } else {
      const info = <TruckDeteledInfo truck={data as TruckType} />;
      return {deteledInfo: info, modal: null}
    }
  }

  const { deteledInfo, modal } = genDeteledComponent();

  return (
    <>
    {deteledInfo}
      <BasicModal open={open} handleClose={handleClose}>
        <div>{!modal ? <></> : modal}</div>
      </BasicModal>
    </>
  );
}
 
export default DeteledInfo;