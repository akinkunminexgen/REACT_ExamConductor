import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { LoadingProvider } from "./context/LoadingContext";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <LoadingProvider>
            <App />
        </LoadingProvider>
  </StrictMode>
);