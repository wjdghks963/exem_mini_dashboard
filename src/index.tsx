import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { mswWorker } from "./mocks/mocks-ts/worker";
import {GlobalStyle} from "./styles/GlobalStyle";
import {QueryClient, QueryClientProvider} from "react-query"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "development") {
   mswWorker.start();
}

const queryClient = new QueryClient();

root.render(
  <>
      <GlobalStyle/>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
  </>
);
