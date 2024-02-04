import { importRemote } from "@module-federation/utilities";
import React from "react";

interface DynamicButtonProps {
  button: {
    url?: string;
    scope?: string;
    module?: string;
  };
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  button: { url, scope, module },
}) => {
  if (!url || !scope || !module) {
    return null;
  }

  const Component = React.lazy(() => importRemote({ url, scope, module }));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
};

export default DynamicButton;
