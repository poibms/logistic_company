import React from 'react';
import AppLoader from '../components/HOC/AppLoader';
import AdminPage from '../components/pages/AdminPage';

const AdminLayout: React.FC = () => {
  return (
    <>
      <AppLoader>
        <AdminPage/>
      </AppLoader>
    </>
  )
}

export default AdminLayout;