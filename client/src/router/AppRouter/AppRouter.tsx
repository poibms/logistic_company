import React, { Suspense } from 'react';
import { publicRoutes } from '../routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getIsLoggedIn } from '../../store/users';
// import Page404 from '../../components/pages/404Page';



const AppRouter: React.FC = () => {
  // const isLoggedIn = useSelector(getIsLoggedIn());
  return (
   <Suspense fallback={<></>}>
    <Router>
      <Routes>
        {publicRoutes.map(route =>
          route.path ? (
            <Route path={route.path} element={<route.component/>} key={route.path} />
          ) : null
        )}
      </Routes>
    </Router>
   </Suspense>
  );
};

export default AppRouter;
