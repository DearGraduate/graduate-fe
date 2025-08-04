import { RouterProvider } from "react-router-dom";
import router from "./router/Routes";
import Modal from "react-modal";
import { useEffect } from "react";
import { initializeAuth } from "./store/authStore";

Modal.setAppElement("#root");

function App() {
  useEffect(() => {
    // 앱 시작 시 인증 상태 초기화
    initializeAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
