import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import { queryClient } from "./services/queryClient";
import App from "./App.jsx";
import "./index.css";
import Analytics from "./components/Analytics.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Analytics />

        <HelmetProvider>
          <App />
        </HelmetProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid rgba(15,23,42,0.10)",
              boxShadow: "0 10px 30px rgba(15,23,42,0.10)",
              zIndex: 99999,
            },
          }}
          containerStyle={{ zIndex: 99999 }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  
  </StrictMode>,
);
