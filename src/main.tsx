import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Editor from "./containers/Editor";
import React from "react";
import { Toaster } from 'sonner'
import MarkdownView from "./containers/MarkdownView";
import Canvas from "./containers/Canvas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/markdown",
    element: <MarkdownView />,
  },
  {
    path: "/canvas",
    element: <Canvas />,
  }
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Toaster />
      <RouterProvider router={router} />
  </React.StrictMode>
);
