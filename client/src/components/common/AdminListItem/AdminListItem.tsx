import * as React from 'react';
import { OrderType } from '../../../types/types';

type ListItemPropsType = {
  order: OrderType,
  onClickHandle: any
}

const AdminListItem: React.FC<ListItemPropsType> = ({ order, onClickHandle }) => {
  return (
    <div className='listitem flex align_center justify_center'>
      <div className="listitem_wrapper ">
        <div className="flex align_center"
        onClick={() => onClickHandle(order)}>
          <div className='listitem_inner flex listitem_inner-img'>
            <img src={`http://localhost:3007/${order.image}`} alt='item img'/>
          </div>
          <div className='listitem_inner flex flex_column align_left'>
            <div className='item_title'>
              <p>{order.cargo_name}</p>
            </div>
            <div className='item_text'>
              <p>Откуда: {order.from}</p>
            </div>
            <div className='item_text'>
              <p>Куда: {order.to}</p>
            </div>
            <div className='item_text'>
              <p>Вес: {order.weight} т</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AdminListItem;