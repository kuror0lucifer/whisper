import { FC } from "react";
import { Button } from "../../styledComponents/Button";

type SignUpButtonProps = {
  clickSignUp: () => void;
};

export const SignUpButton: FC<SignUpButtonProps> = ({ clickSignUp }) => {
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
      onClick={() => clickSignUp()}
    >
      Sign Up
    </Button>
  );
};
