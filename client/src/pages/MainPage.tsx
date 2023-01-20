import React from 'react';
import Header from '../components/common/Header/Header';
import MainLayout from '../components/layouts/Main';
// import Footer from '../components/common/Footer';
// import Header from '../components/common/Header';
// import HomePage from '../components/pages/HomePage';

const MainPage: React.FC = () => {
  return (
    <>
      <Header/>
      <MainLayout/>
    </>
  );
};

export default MainPage;