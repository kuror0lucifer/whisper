import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "./styledComponents/GlobalStyles.ts";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { GameInfo } from "./components/GameInfo/GameInfo.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <StrictMode>
          <Routes>
            <Route path="*" element={<App />} />
            <Route path="/game/:sku" element={<GameInfo />} />
          </Routes>
        </StrictMode>
      </BrowserRouter>
    </Provider>
  );
}
