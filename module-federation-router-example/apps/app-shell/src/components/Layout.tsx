import React from "react";
import { Link, Outlet } from "react-router-dom";
import { appJobsPrefix, appNetworkPrefix } from "../constants/prefix";

const Layout = () => (
  <div>
    <nav>
      <li>
        <Link to={`/${appJobsPrefix}/1`}>App Jobs Page 1</Link>
      </li>
      <li>
        <Link to={`/${appJobsPrefix}/2`}>App Jobs Page 2</Link>
      </li>
      <li>
        <Link to={`/${appNetworkPrefix}/a`}>App Network Page A</Link>
      </li>
      <li>
        <Link to={`/${appNetworkPrefix}/b`}>App Network Page B</Link>
      </li>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
