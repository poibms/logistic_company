import React from 'react';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import MainPage from '../components/pages/Main';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header/>
      <MainPage/>
      <Footer/>
    </>
  );
};

export default MainLayout;