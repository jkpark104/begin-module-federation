import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";
import { type RouterType } from "./injector";

interface CreateRouterProps {
  type: RouterType;
  basePath?: string;
}

export function createRouter({ type, basePath }: CreateRouterProps) {
  switch (type) {
    case "browser":
      return createBrowserRouter(routes);
    case "memory":
      return createMemoryRouter(routes, { initialEntries: [basePath || "/"] });
  }
}
