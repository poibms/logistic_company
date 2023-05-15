import * as React from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../../../store/user';


const Profile = () => {
  const authUser = useSelector(getAuthUser());

  return (
  <div className='flex flex_column justify-center align_center mt-30'>
    <h2 className='mg-btm-20'>Welcome to your profile page</h2>

    <div className='flex align_center'>
      <p>
        <b>Email</b> {authUser?.email}
      </p>
    </div>
    <div className='flex align_center'>
      <p>
        <b>Role</b> {authUser?.role}
      </p>
    </div>
  </div>);
}
 
export default Profile;