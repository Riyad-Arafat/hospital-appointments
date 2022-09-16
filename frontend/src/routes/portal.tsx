import { RouteProps } from "react-router-dom";
import AuthedLayout from "@routes/guards/AuthedLayout";

export const PortalRoutes: RouteProps[] = [
  {
    path: `dashboard`,
    element: (
      <AuthedLayout>
        <h1>Dashboard</h1>
      </AuthedLayout>
    ),
  },
  {
    path: `users`,
    caseSensitive: true,
    element: (
      <AuthedLayout>
        <h1>Users</h1>
      </AuthedLayout>
    ),
  },
  {
    path: `users/:id`,
    caseSensitive: true,
    element: (
      <AuthedLayout>
        <h1>User</h1>
      </AuthedLayout>
    ),
  },
  {
    path: `profile`,
    element: (
      <AuthedLayout>
        <h1>Profile</h1>
      </AuthedLayout>
    ),
  },
  {
    path: "*",
    element: (
      <AuthedLayout>
        <h1>404</h1>
      </AuthedLayout>
    ),
  },
];

export default PortalRoutes;
