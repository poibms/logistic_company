import * as React from 'react';
const AdminListItem = () => {
  return (
    <div className='listitem flex align_center justify_center'>
      <div className="listitem_wrapper ">
        <div className="flex align_center">
          <div className='listitem_inner flex listitem_inner-img'>
            <img src='http://missyapple.com/ru/wp-content/uploads/sites/5/2015/05/pack3.png' alt='item img'/>
          </div>
          <div className='listitem_inner flex flex_column align_left'>
            <div className='item_title'>
              <p>Яблоки</p>
            </div>
            <div className='item_text'>
              <p>Откуда: г.Минск, ул.Леонида Беды, д.34</p>
            </div>
            <div className='item_text'>
              <p>Куда: г.Брест, ул.Ленина, д.2</p>
            </div>
            <div className='item_text'>
              <p>Вес: 23 т</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AdminListItem;