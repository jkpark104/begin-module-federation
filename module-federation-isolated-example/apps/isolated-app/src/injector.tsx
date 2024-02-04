import React from "react";
import { createRoot } from "react-dom/client";
import App, { AppProps } from "./App";

export const inject = (parentElementId: string, props: AppProps) => {
  const root = createRoot(document.getElementById(parentElementId)!);
  root.render(<App {...props} />);

  return () => {
    root.unmount();
  };
};
