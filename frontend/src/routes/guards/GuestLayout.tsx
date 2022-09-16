import { HandleTitle } from "@components/HandleTitle";
import { LoadingSpin } from "@components/LoadingSpin";
import React, { PropsWithChildren, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  authedOk?: boolean;
}

const GuestLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  authedOk = false,
}): JSX.Element => {
  let isAuthenticated = true;
  if (isAuthenticated) {
    if (!authedOk) return <Navigate to={"/"} replace />;
  }

  return (
    <HandleTitle>
      <Suspense
        fallback={
          <div style={{ height: "100vh" }}>
            <LoadingSpin />
          </div>
        }
      >
        {children ? children : <Outlet />}
      </Suspense>
    </HandleTitle>
  );
};

export default GuestLayout;
