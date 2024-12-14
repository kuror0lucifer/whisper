import React, { FC } from "react";
import styled from "styled-components";

interface TitleProps {
  color?: string;
  children: React.ReactNode;
}

const StyledTitleH1 = styled.h1<TitleProps>`
  color: ${(props) => props.color || "inherit"};
`;

export const TitleH1: FC<TitleProps> = (props) => {
  return <StyledTitleH1 {...props}>{props.children}</StyledTitleH1>;
};
