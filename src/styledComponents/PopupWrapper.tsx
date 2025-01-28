import { FC } from "react";
import styled from "styled-components";

interface PopupWrapperProps {
  $position: "relative" | "sticky" | "absolute" | "static" | "fixed";
  $top: string;
  $bottom: string;
  $right: string;
  display: string;
  $justify: string;
  $align: string;
  width: string;
  height: string;
  $bgColor: string;
  $zIndex: number;

  children: React.ReactNode;
  onClick: () => void;
}

const StyledPopupWrapper = styled.div<Partial<PopupWrapperProps>>`
  position: ${(props) => props.$position || "fixed"};
  top: ${(props) => props.$top || "0"};
  right: ${(props) => props.$right || "0"};
  display: ${(props) => props.display || "flex"};
  justify-content: ${(props) => props.$justify || "center"};
  align-items: ${(props) => props.$align || "center"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background-color: ${(props) => props.$bgColor || "rgba(0,0,0,0.5)"};
  z-index: ${(props) => props.$zIndex || 1000};
`;

export const PopupWrapper: FC<Partial<PopupWrapperProps>> = (props) => {
  return <StyledPopupWrapper {...props}>{props.children}</StyledPopupWrapper>;
};
