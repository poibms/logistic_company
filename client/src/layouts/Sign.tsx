import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import SignInPage from '../components/pages/SignInPage';
import SignUpPage from '../components/pages/SignUpPage';


const Sign: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  console.log(type)
  return (
    <>
      <Header/>
        { type === 'signUp' ? <SignUpPage/> : <SignInPage/> }
    </>
  )
}

export default Sign;