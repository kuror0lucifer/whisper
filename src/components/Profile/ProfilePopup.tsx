import { FC } from "react";
import ReactDOM from "react-dom";
import { PopupWrapper } from "../../styledComponents/PopupWrapper";

export const ProfilePopup: FC = () => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    console.error("Portal not found");
    return null;
  }
  return ReactDOM.createPortal(<PopupWrapper></PopupWrapper>, portalRoot);
};
