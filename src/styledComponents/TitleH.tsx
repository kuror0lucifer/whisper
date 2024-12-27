import React, { FC } from "react";
import styled from "styled-components";

interface TitleProps {
  as: keyof JSX.IntrinsicElements;
  color?: string;
  $margin: string;
  children: React.ReactNode;
}

const StyledTitleH = styled.h1<TitleProps>`
  color: ${(props) => props.color || "inherit"};
  margin: ${(props) => props.$margin || "0"};
`;

export const TitleH: FC<TitleProps> = (props) => {
  return <StyledTitleH {...props}>{props.children}</StyledTitleH>;
};
