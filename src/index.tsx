import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { mswWorker } from "./mocks/mocks-ts/worker";
import {GlobalStyle} from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "development") {
   mswWorker.start();
}

root.render(
  <React.StrictMode>
      <GlobalStyle/>
      <App />
  </React.StrictMode>
);
