import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const client = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <HashRouter>
          <RouterProvider router={router} />
        </HashRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
