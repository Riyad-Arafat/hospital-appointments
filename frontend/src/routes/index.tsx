import { Route, Routes } from "react-router-dom";
import DefaultRoutes from "./default";
import React from "react";

const DefaultLayout = React.lazy(
  () => import("components/Layout/DefaultLayout")
);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {DefaultRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routing;
