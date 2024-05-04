import React from "react";
// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import AuthGuard from "./components/guards/AuthGuard";
//Auth
import Page404 from "./pages/auth/Page404";
import SignIn from "./pages/auth/SignIn";
// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
//Components
import Default from "./pages/dashboards/Default";
import Blank from "./pages/pages/Blank";
import Privacy from "./pages/policy/Privacy";
import FairytaleApps from "./pages/fairytale-apps";
import AppCreateNew from "./pages/fairytale-apps/AppCreateNew";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import CreateUser from "./pages/fairytale-users/CreateUser";
import AppDetail from "./pages/fairytale-apps/AppDetail";
import { Navigate, Outlet } from "react-router-dom";
import FairytaleUsers from "./pages/fairytale-users";
import Profile from "./pages/pages/Profile";
import ResetPasswordWithToken from "./components/auth/ResetPasswordWithToken";
import FairytaleMessages from "./pages/fairytale-messaging";
import CreateMessage from "./pages/fairytale-messaging/CreateMessage";
import AppUserGroupPage from "./pages/fairytale-apps-user-group";
import PartnerGroupDetailsView from "./pages/fairytale-apps-partner-group/PartnerGroupDetailsView";

const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="private/dashboard/home" replace={true} />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "password-reset/:token",
        element: <ResetPasswordWithToken />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "dashboard",
        children: [
          {
            path: "home",
            element: <Default/>,
          },
          {
            path: "test",
            element: <Profile />,
          },
        ],
      },
      {
        path: "apps",
        children: [
          {
            path: "list",
            children: [
              {
                path: "all",
                element: <FairytaleApps />,
              },
              {
                path: ":appID",
                element: <AppDetail />,
              },
            ],
          },
          {
            path: "new",
            element: <AppCreateNew />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: "list",
            element: <FairytaleUsers />,
          },
          {
            path: "new",
            element: <CreateUser />,
          },
        ],
      },
      {
        path: "users-groups",
        children: [
          {
            path: "list",
            element: <AppUserGroupPage />,
          },
        ],
      },
      {
        path: "messaging",
        children: [
          {
            path: "view",
            element: <FairytaleMessages />,
          },
          {
            path: "send",
            element: <CreateMessage />,
          },
        ],
      },
      {
        path: "media",
        children: [
          {
            path: "view",
            element: <Blank />,
          },
          {
            path: "upload",
            element: <Blank />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
