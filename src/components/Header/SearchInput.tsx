import { FC } from "react";
import { Input } from "../../styledComponents/Input";

export const SearchInput: FC = () => {
  return (
    <Input
      width="400px"
      height="25px"
      $borderBottom="1px solid black"
      padding="0 20px"
      $fontSize="20px"
      margin="0 0 0 20%"
    />
  );
};
