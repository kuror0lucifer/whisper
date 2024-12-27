import { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  display: string;
  $direction: "row" | "column" | "row-reverse" | "column-reverse";
  $align: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  $justify:
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  $wrap: "nowrap" | "wrap" | "wrap-reverse";
  $gap: string;
  width: string;
  height: string;
  $backgroundColor: string;
  border: string;
  $borderRadius: string;
  $margin: string;
  cursor: string;
  children: React.ReactNode;

  onClick: () => void;
}

const StyledButton = styled.button<Partial<ButtonProps>>`
  display: ${(props) => props.display || "block"};
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => props.$align || "stretch"};
  justify-content: ${(props) => props.$justify || "stretch"};
  flex-wrap: ${(props) => props.$wrap || "wrap"};
  gap: ${(props) => props.$gap || "0"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  background-color: ${(props) => props.$backgroundColor || "transparent"};
  border: ${(props) => props.border || "0"};
  border-radius: ${(props) => props.$borderRadius || "0"};
  margin: ${(props) => props.$margin || "0"};
  cursor: ${(props) => props.cursor || "default"};
`;

export const Button: FC<Partial<ButtonProps>> = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
