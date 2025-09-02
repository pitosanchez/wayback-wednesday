import React, { useEffect, useMemo, useState } from "react";
import UnderConstruction from "./UnderConstruction";

interface MaintenanceGateProps {
  children: React.ReactNode;
  enabled: boolean;
  tokenEnvVar?: string;
}

const STORAGE_KEY = "preview_access";

const MaintenanceGate: React.FC<MaintenanceGateProps> = ({
  children,
  enabled,
  tokenEnvVar = "VITE_PREVIEW_TOKEN",
}) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const previewToken = useMemo(() => {
    // token configured in env (e.g., VITE_PREVIEW_TOKEN)
    // only read from import.meta.env on client
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const env: any = import.meta.env || {};
      return env[tokenEnvVar];
    } catch {
      return undefined;
    }
  }, [tokenEnvVar]);

  useEffect(() => {
    // accept token via ?preview=TOKEN and store in localStorage
    const params = new URLSearchParams(window.location.search);
    const paramToken = params.get("preview");
    if (paramToken) {
      localStorage.setItem(STORAGE_KEY, paramToken);
      // clean query param without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("preview");
      window.history.replaceState({}, "", url.toString());
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!enabled) {
      setHasAccess(true);
    } else if (stored && previewToken && stored === previewToken) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [enabled, previewToken]);

  if (!enabled) {
    return <>{children}</>;
  }

  if (hasAccess) {
    return (
      <>
        {children}
        <div className="fixed bottom-4 left-4 z-[60] px-3 py-1.5 rounded-full bg-fire-red text-white text-xs shadow-lg border border-white/10">
          Team Preview
        </div>
      </>
    );
  }

  return <UnderConstruction />;
};

export default MaintenanceGate;
