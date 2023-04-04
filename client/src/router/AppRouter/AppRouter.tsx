import React, { Suspense } from "react";
import { adminRoutes, privateRoutes, publicRoutes } from "../routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn, isAdmin as getIsAdmin } from "../../store/user";
import Page404 from "../../components/pages/404Page/Page404";

const AppRouter: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isAdmin = useSelector(getIsAdmin());
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Routes>
          {isLoggedIn &&
            privateRoutes.map((route) =>
              route.path ? (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={route.path}
                />
              ) : null
            )}
          {isAdmin &&
            adminRoutes.map((route) =>
              route.path ? (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={route.path}
                />
              ) : null
            )}
          {publicRoutes.map((route) =>
            route.path ? (
              <Route
                path={route.path}
                element={<route.component />}
                key={route.path}
              />
            ) : null
          )}
          <Route path='*' element={<Page404/>} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
