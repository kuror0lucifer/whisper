import { FC } from "react";
import styled from "styled-components";

interface FlexProps {
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
  $margin: string;
  $gap: string;
  width: string;
  height: string;
  children: React.ReactNode;
}

const StyledFlex = styled.div<Partial<FlexProps>>`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => props.$align || "stretch"};
  justify-content: ${(props) => props.$justify || "stretch"};
  flex-wrap: ${(props) => props.$wrap || "wrap"};
  gap: ${(props) => props.$gap || "0"};
  margin: ${(props) => props.$margin || "0"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
`;

export const Flex: FC<Partial<FlexProps>> = (props) => {
  return <StyledFlex {...props}>{props.children}</StyledFlex>;
};
