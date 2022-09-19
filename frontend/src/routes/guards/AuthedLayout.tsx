import React, { memo, PropsWithChildren, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { HandleTitle } from "components/HandleTitle";
import { LoadingSpin } from "components/LoadingSpin";
import useAuth from "hooks/useAuth";
// Add a description to the interface

interface Props {
  superAdmin?: boolean;
}

const AuthedLayout: React.FC<PropsWithChildren<Props>> = memo(
  ({ children, superAdmin }: PropsWithChildren<Props>): JSX.Element => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (!!user && user.role !== "super_admin" && superAdmin)
      return <Navigate to="/login" />;

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
