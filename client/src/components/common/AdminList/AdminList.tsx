import * as React from 'react';
import { DriverType, OrderType } from '../../../types/types';
import AdminListItem from '../AdminListItem/AdminListItem';

type AdminListType = {
  data: OrderType[] | DriverType[],
  dataType: string,
  onClickHandle: any
  
}

const AdminList: React.FC<AdminListType> = ({ data, dataType, onClickHandle }) => {

  const genListItem = () => {
    return data.map((item: OrderType | DriverType) => (
      <AdminListItem key={item.id} order={item} dataType={dataType} onClickHandle={onClickHandle}/>
    ))
  }

  const listItem = genListItem();

  return (
    <div className='adminlist'>
      <div className='adminlist_wrapper'>
        {listItem}
      </div>
    </div>
  );
}
 
export default AdminList;