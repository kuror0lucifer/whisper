import React, { FC } from "react";
import styled from "styled-components";

interface PragraphProps {
  color?: string;
  $wrap?: "normal" | "anywhere" | "break-word";
  $maxLines?: number;
  children: React.ReactNode;
}

const StyledParagraph = styled.p<PragraphProps>`
  color: ${(props) => props.color || "white"};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.$maxLines || 2};
  text-overflow: ellipsis;
  overflow-wrap: ${(props) => props.$wrap};
`;

export const Paragraph: FC<PragraphProps> = (props) => {
  return <StyledParagraph {...props}>{props.children}</StyledParagraph>;
};
