import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "./components/Provider";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <Provider>
        <RemixBrowser />
      </Provider>
    </StrictMode>
  );
});