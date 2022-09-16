import React, { memo, PropsWithChildren, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { HandleTitle } from "@components/HandleTitle";
import { LoadingSpin } from "@components/LoadingSpin";
// Add a description to the interface

interface Props {
  // isPortal?: boolean;
}

const AuthedLayout: React.FC<PropsWithChildren<Props>> = memo(
  ({ children }: PropsWithChildren<Props>): JSX.Element => {
    let isAuthenticated = true;
    if (!isAuthenticated) {
      return <Navigate to="/" />;
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
  }
);

export default AuthedLayout;
