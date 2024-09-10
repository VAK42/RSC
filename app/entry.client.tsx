import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { MUIProvider } from "./MUI/MUIProvider";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <MUIProvider>
        <RemixBrowser />
      </MUIProvider>
    </StrictMode>
  );
});