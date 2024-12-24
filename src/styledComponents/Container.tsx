import { FC } from "react";
import styled from "styled-components";

interface ContainerProps {
  display: string;
  $justify: string;
  $align: string;
  width: string;
  height: string;
  margin: string;
  $padding: string;
  $bgColor: string;
  $borderRadius: string;
  children: React.ReactNode;
}

const StyledContainer = styled.div<Partial<ContainerProps>>`
  display: ${(props) => props.display || "block"};
  justify-content: ${(props) => props.$justify || "stretch"};
  align-items: ${(props) => props.$align || "stretch"};
  width: ${(props) => (props.width ? props.width : "auto")};
  padding: ${(props) => props.$padding || "0"};
  height: ${(props) => (props.height ? props.height : "auto")};
  margin: ${(props) => props.margin || "0"};
  background-color: ${(props) => props.$bgColor || "transparent"};
  border-radius: ${(props) => props.$borderRadius || "0"};
`;

export const Container: FC<Partial<ContainerProps>> = (props) => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>;
};
