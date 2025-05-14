import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import React from "react";
import type { LinksFunction } from "@remix-run/node";
import { CssBaseline } from "@mui/material";
import Tailwind from "~/tailwind.css?url";
import Stylesheet from "~/RSC.css?url";
import FontAwesome from "./FontAwesome/css/all.css?url";
import AppleTouchIcon from "./IMG/Favicon/Apple.png";
import Favicon32 from "./IMG/Favicon/Favicon_32.png";
import Favicon16 from "./IMG/Favicon/Favicon_16.png";
import Favicon from "./IMG/Favicon/Favicon.ico";
import Safari from "./IMG/Favicon/Safari.svg";
import Manifest from "./IMG/Favicon/site.webmanifest";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Theme } from "./components/Theme";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: Tailwind },
  { rel: "apple-touch-icon", sizes: "180x180", href: AppleTouchIcon },
  { rel: "manifest", href: Manifest },
  { rel: "icon", type: "image/png", sizes: "32x32", href: Favicon32 },
  { rel: "icon", type: "image/png", sizes: "16x16", href: Favicon16 },
  { rel: "shortcut icon", href: Favicon },
  { rel: "mask-icon", href: Safari, color: "#fff" },
  { rel: "stylesheet", href: FontAwesome },
  { rel: "stylesheet", href: Stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Ryan Sports Club</title>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta
          name="msapplication-config"
          content="/IMG/Favicon/browserconfig.xml"
        />
        <meta name="theme-color" content={Theme.palette.primary.main} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}