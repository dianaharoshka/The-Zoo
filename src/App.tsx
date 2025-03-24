import { RouterProvider } from "react-router";
import "./App.scss";
import "./styles/layout.scss";
import { router } from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
