import styled from "styled-components";

interface FormProps {
  width: string;
  $gap: string;
  $align: string;
  $justify: string;
  $direction: string;
  padding: string;
  $bgColor: string;
  $borderRadius: string;
}

export const Form = styled.form<Partial<FormProps>>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  width: ${({ width }) => width};
  gap: ${({ $gap }) => $gap};
  padding: ${({ padding }) => padding};
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: ${({ $borderRadius }) => $borderRadius};
`;
