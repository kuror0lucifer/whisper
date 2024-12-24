import { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  width: string;
  height: string;
  $backgroundColor: string;
  border: string;
  cursor: string;
  children: React.ReactNode;
}

const StyledButton = styled.button<Partial<ButtonProps>>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  background-color: ${(props) => props.$backgroundColor || "transparent"};
  border: ${(props) => props.$backgroundColor || "0"};
  cursor: ${(props) => props.cursor || "default"};
`;

export const Button: FC<Partial<ButtonProps>> = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
