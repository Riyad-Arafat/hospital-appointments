import { RouteProps } from "react-router-dom";

import GuestLayout from "routes/guards/GuestLayout";
import AuthedLayout from "routes/guards/AuthedLayout";

export const DefaultRoutes: RouteProps[] = [
  {
    path: `/`,
    caseSensitive: true,
    element: (
      <GuestLayout authedOk>
        <h1>Home</h1>
      </GuestLayout>
    ),
  },
  {
    path: `register`,
    element: (
      <GuestLayout>
        <h1>Register</h1>
      </GuestLayout>
    ),
  },
  {
    path: `login`,
    element: (
      <GuestLayout>
        <h1>Login</h1>
      </GuestLayout>
    ),
  },
  {
    path: `logout`,
    element: (
      <AuthedLayout>
        <h1>Logout</h1>
      </AuthedLayout>
    ),
  },

  {
    path: "*",
    element: (
      <GuestLayout authedOk>
        <h1>404</h1>
      </GuestLayout>
    ),
  },
];

export default DefaultRoutes;
