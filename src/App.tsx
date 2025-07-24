import { RouterProvider } from "react-router-dom";
import router from "./router/Routes";
import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  return <RouterProvider router={router} />;
}

export default App;
