import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HeadProvider } from "react-head";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeadProvider>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </HeadProvider>
    </QueryClientProvider>
  </StrictMode>,
);
