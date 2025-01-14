import { FC } from "react";
import styled from "styled-components";

interface ContainerProps {
  $position: "relative" | "sticky" | "absolute" | "static" | "fixed";
  $bottom: string;
  $right: string;
  display: string;
  $justify: string;
  $align: string;
  width: string;
  $maxWidth: string;
  height: string;
  $margin: string;
  $padding: string;
  $bgColor: string;
  $borderRadius: string;
  children: React.ReactNode;

  onClick: () => void;
}

const StyledContainer = styled.div<Partial<ContainerProps>>`
  position: ${(props) => props.$position || "static"};
  ${(props) => props.$bottom && `bottom: ${props.$bottom};`}
  ${(props) => props.$right && `right: ${props.$right};`}
  display: ${(props) => props.display || "block"};
  ${(props) => props.$justify && `justify-content: ${props.$justify};`}
  ${(props) => props.$align && `align-items: ${props.$align};`}
  width: ${(props) => props.width || "auto"};
  max-width: ${(props) => props.width || "auto"};
  padding: ${(props) => props.$padding || "0"};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.$margin || "0"};
  background-color: ${(props) => props.$bgColor || "transparent"};
  border-radius: ${(props) => props.$borderRadius || "0"};
`;

export const Container: FC<Partial<ContainerProps>> = (props) => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>;
};
