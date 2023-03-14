import * as React from 'react';
import { OrderType } from '../../../types/types';
import AdminListItem from '../AdminListItem/AdminListItem';

type AdminListType = {
  data: OrderType[],
}

const AdminList: React.FC<AdminListType> = ({ data }) => {

  return (
    <div className='adminlist'>
      <div className='adminlist_wrapper'>
        <AdminListItem />
      </div>
    </div>
  );
}
 
export default AdminList;