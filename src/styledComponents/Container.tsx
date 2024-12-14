import React, { FC } from "react";
import styled from "styled-components";

interface ContainerProps {
  width: string;
  height: string;
  $margin: string;
  key: string;
  children: React.ReactNode;
}

const StyledContainer = styled.div<Partial<ContainerProps>>`
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  margin: ${(props) => props.$margin};
`;

export const Container: FC<Partial<ContainerProps>> = (props) => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>;
};
