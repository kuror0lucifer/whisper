import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./styledComponents/GlobalStyles.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyles />
    <StrictMode>
      <App />
    </StrictMode>
  </>
);
