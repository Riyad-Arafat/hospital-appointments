import ProfilePage from "pages/Profile";
import SpecialitiesPage from "pages/Specialities";
import UsersPage from "pages/Users";
import React from "react";
import { RouteProps } from "react-router-dom";

import GuestLayout from "routes/guards/GuestLayout";
import AuthedLayout from "./guards/AuthedLayout";

const HomePage = React.lazy(() => import("pages/Home"));
const LoginPage = React.lazy(() => import("pages/Login"));
const RegisterPage = React.lazy(() => import("pages/Register"));

export const DefaultRoutes: RouteProps[] = [
  {
    path: `/`,
    caseSensitive: true,
    element: (
      <AuthedLayout>
        <HomePage />
      </AuthedLayout>
    ),
  },

  {
    path: `profile`,
    element: (
      <AuthedLayout>
        <ProfilePage />
      </AuthedLayout>
    ),
  },
  {
    path: `specialities`,
    element: (
      <AuthedLayout superAdmin>
        <SpecialitiesPage />
      </AuthedLayout>
    ),
  },
  {
    path: `users`,
    element: (
      <AuthedLayout superAdmin>
        <UsersPage />
      </AuthedLayout>
    ),
  },
  {
    path: `register`,
    element: (
      <GuestLayout>
        <RegisterPage />
      </GuestLayout>
    ),
  },
  {
    path: `login`,
    element: (
      <GuestLayout>
        <LoginPage />
      </GuestLayout>
    ),
  },
  {
    path: `logout`,
    element: (
      <GuestLayout>
        <LoginPage />
      </GuestLayout>
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
