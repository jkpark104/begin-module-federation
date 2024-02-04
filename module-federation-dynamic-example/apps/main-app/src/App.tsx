import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import DynamicButton from "./components/DynamicButton";

// @ts-ignore
const Button = React.lazy(() => import("dynamic/Button"));

const App = () => {
  const [button, setButton] = React.useState<{
    url?: string;
    scope?: string;
    module?: string;
  }>({});

  function setButtonFromComponentApp1() {
    setButton({
      url: "http://localhost:3001",
      scope: "component_app1",
      module: "./Button",
    });
  }

  function setButtonFromComponentApp2() {
    setButton({
      url: "http://localhost:3002",
      scope: "component_app2",
      module: "./Button",
    });
  }

  return (
    <div className="container">
      <div>Name: main-app</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Empty CSS</div>
      <button onClick={setButtonFromComponentApp1}>
        Load Component App 1 Button
      </button>
      <button onClick={setButtonFromComponentApp2}>
        Load Component App 2 Button
      </button>
      <div>
        <DynamicButton button={button} />
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Button />
        </Suspense>
      </div>
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("app")!).render(<App />);
