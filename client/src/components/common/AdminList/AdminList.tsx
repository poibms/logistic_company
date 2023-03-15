import * as React from 'react';
import { OrderType } from '../../../types/types';
import AdminListItem from '../AdminListItem/AdminListItem';

type AdminListType = {
  data: OrderType[],
  onClickHandle: any
  
}

const AdminList: React.FC<AdminListType> = ({ data, onClickHandle }) => {

  const genListItem = () => {
    return data.map((item: OrderType) => (
      <AdminListItem key={item.id} order={item} onClickHandle={onClickHandle}/>
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