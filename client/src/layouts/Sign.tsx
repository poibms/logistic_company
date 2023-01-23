import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header/Header';


const Sign = () => {
  const { type } = useParams<{ type?: string }>()
  return (
    <Header/>
    // {type === 'signUp ? '}
    // <Footer/>
  )
}

export default Sign;