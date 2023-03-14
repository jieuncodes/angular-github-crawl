import { createHashRouter } from "react-router-dom";
import App from "./App";
import IssueDetail from "./components/IssueDetail";
import IssueBoxes from "./components/IssueBoxes";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <IssueBoxes />,
      },
      {
        path: "issue/:id",
        element: <IssueDetail />,
      },
    ],
  },
]);
export default router;
