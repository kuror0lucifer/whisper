import React, { FC } from "react";
import styled from "styled-components";

interface TitleProps {
  as: keyof JSX.IntrinsicElements;
  color?: string;
  $margin?: string;
  $size?: string;
  $align?: string;
  children: React.ReactNode;
}

const StyledTitleH = styled.h1<TitleProps>`
  color: ${(props) => props.color || "inherit"};
  margin: ${(props) => props.$margin || "0"};
  font-size: ${(props) => props.$size};
  text-align: ${(props) => props.$align};
`;

export const TitleH: FC<TitleProps> = (props) => {
  return <StyledTitleH {...props}>{props.children}</StyledTitleH>;
};
