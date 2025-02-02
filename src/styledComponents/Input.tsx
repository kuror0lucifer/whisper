import { ChangeEvent, forwardRef } from "react";
import styled from "styled-components";

interface InputProps {
  width: string;
  height: string;
  $borderRadius: string;
  border: string;
  $borderTop: string;
  $borderRight: string;
  $borderBottom: string;
  $borderLeft: string;
  $backgroundColor: string;
  $fontSize: string;
  color: string;
  $padding: string;
  $margin: string;
  outline: string;

  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input<Partial<InputProps>>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  border-radius: ${(props) => props.$borderRadius || "none"};
  border: ${(props) => props.border || "none"};
  border-top: ${(props) => props.$borderTop || "none"};
  border-right: ${(props) => props.$borderRight || "none"};
  border-bottom: ${(props) => props.$borderBottom || "none"};
  border-left: ${(props) => props.$borderLeft || "none"};
  background-color: ${(props) => props.$backgroundColor || "transparent"};
  font-size: ${(props) => props.$fontSize || "14px"};
  color: ${(props) => props.color || "transparent"};
  padding: ${(props) => props.$padding || "0"};
  margin: ${(props) => props.$margin || "auto"};
  outline: ${(props) => props.outline || "none"};
`;

export const Input = forwardRef<HTMLInputElement, Partial<InputProps>>(
  (props, ref) => {
    return <StyledInput {...props} ref={ref} />;
  }
);
