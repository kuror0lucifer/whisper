import { FC } from "react";
import { Button } from "../../styledComponents/Button";

export const SignUpButton: FC = () => {
  return (
    <Button
      $backgroundColor="white"
      $border="1px solid blue"
      $borderRadius="5px"
      width="70px"
      height="80%"
      $margin="0 auto"
      color="black"
      cursor="pointer"
    >
      Sign Up
    </Button>
  );
};
