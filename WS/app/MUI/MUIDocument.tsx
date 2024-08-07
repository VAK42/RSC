import { CssBaseline } from "@mui/material";
import React from "react";

export function MUIDocument({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}