import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "./components/CustomToastContainer/CustomToastContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <Provider store={store}>
          <CustomToastContainer />
          <App />
        </Provider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
