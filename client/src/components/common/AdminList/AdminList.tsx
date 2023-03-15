import * as React from 'react';
import { OrderType } from '../../../types/types';
import AdminListItem from '../AdminListItem/AdminListItem';

type AdminListType = {
  data: OrderType[],
  onClickHandle: any
  
}

const AdminList: React.FC<AdminListType> = ({ data, onClickHandle }) => {

  return (
    <div className='adminlist'>
      <div className='adminlist_wrapper'>
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        <AdminListItem onClickHandle={onClickHandle} />
        
      </div>
    </div>
  );
}
 
export default AdminList;