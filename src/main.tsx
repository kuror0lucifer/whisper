import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styledComponents/GlobalStyles.ts";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GlobalStyles />
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
