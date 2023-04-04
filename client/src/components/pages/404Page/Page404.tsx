import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../common/Container';

const Page404 = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <Container>
        <main className='main-page404'>
          <h2 className='page404__title'>404 Страница не найдена :(</h2>
          <button className='button' onClick={handleGoHome}>
            На главную
          </button>
        </main>
      </Container>
    </>
  );
};

export default Page404;
