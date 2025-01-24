import { FC } from "react";
import { Button } from "../../styledComponents/Button";

type LogInButtonProps = {
  clickLogIn: () => void;
};

export const LogInButton: FC<LogInButtonProps> = ({ clickLogIn }) => {
  return (
    <Button
      $border="1px solid white"
      $borderRadius="5px"
      $backgroundColor="red"
      $margin="0 auto"
      width="70px"
      height="80%"
      color="white"
      cursor="pointer"
      onClick={clickLogIn}
    >
      Log In
    </Button>
  );
};
