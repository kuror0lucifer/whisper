import { FC } from "react";
import styled from "styled-components";

interface ImgProps {
  width: string;
  height: string;
  $cover: string;
  src: string;
  loading: "eager" | "lazy";
}

const StyledImg = styled.img<Partial<ImgProps>>`
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  cover: ${(props) => props.$cover || "cover"};
`;

export const Image: FC<Partial<ImgProps>> = (props) => {
  return <StyledImg {...props} />;
};
