import { useEffect, useState } from "react";

// https://stephencook.dev/blog/using-window-in-react-ssr/
export function useIsSsr() {
  // we always start off in "SSR mode", to ensure our initial browser render
  // matches the SSR render
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    // `useEffect` never runs on the server, so we must be on the client if
    // we hit this block
    setIsSsr(false);
  }, []);

  return isSsr;
}
