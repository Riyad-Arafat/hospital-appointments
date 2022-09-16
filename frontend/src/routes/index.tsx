import { Route, Routes } from "react-router-dom";
import DefaultRoutes from "./default";
import PortalRoutes from "./portal";
import React from "react";

const PortalLayout = React.lazy(
  () => import("@components/Layout/PortalLayout")
);
const DefaultLayout = React.lazy(
  () => import("@components/Layout/DefaultLayout")
);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {DefaultRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/portal" element={<PortalLayout />}>
        {PortalRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routing;
