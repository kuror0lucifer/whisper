import { FC } from "react";
import styled from "styled-components";

interface WrapperProps {
  $position: "relative" | "sticky" | "absolute" | "static" | "fixed";
  width: string;
  height: string;
  children: React.ReactNode;
}

const StyledWrapper = styled.div<Partial<WrapperProps>>`
  position: ${(props) => props.$position || "static"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
`;

export const Wrapper: FC<Partial<WrapperProps>> = ({ children, ...props }) => {
  return <StyledWrapper {...props}>{children}</StyledWrapper>;
};
