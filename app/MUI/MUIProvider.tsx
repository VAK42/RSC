import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import MUITheme from "./MUITheme";
import createCache from "@emotion/cache";
import React from "react";

function createEmotionCache() {
  return createCache({ key: "css" });
}

export function MUIProvider({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={MUITheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}