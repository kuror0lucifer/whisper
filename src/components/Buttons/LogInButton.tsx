import { FC } from "react";
import { Button } from "../../styledComponents/Button";

export const LogInButton: FC = () => {
  return (
    <Button
      $border="1px solid white"
      $borderRadius="5px"
      $backgroundColor="blue"
      $margin="0 auto"
      width="70px"
      height="80%"
      color="white"
      cursor="pointer"
    >
      Log In
    </Button>
  );
};
