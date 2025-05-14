import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import React from "react";
import { Theme } from "./Theme";

function createEmotionCache() {
  return createCache({ key: "css" });
}

export function Provider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}