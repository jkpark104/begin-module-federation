import React, { useEffect } from "react";
import {
  Navigate,
  Outlet,
  matchRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";

const RoutingManager: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail;
      if (
        location.pathname === pathname ||
        !matchRoutes(routes, { pathname })
      ) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener("[app-shell] navigated", shellNavigationHandler);

    return () => {
      window.removeEventListener(
        "[app-shell] navigated",
        shellNavigationHandler
      );
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[app-network] navigated", { detail: location.pathname })
    );
  }, [location]);

  return <Outlet />;
};

export const routes = [
  {
    path: "/",
    element: <RoutingManager />,
    children: [
      {
        index: true,
        element: <Navigate to={`/a`} />,
      },
      {
        path: "a",
        element: <div>App Network Page A</div>,
      },
      {
        path: "b",
        element: <div>App Network Page B</div>,
      },
    ],
  },
];
