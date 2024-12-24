import { FC } from "react";
import { Input } from "../../styledComponents/Input";
import { Container } from "../../styledComponents/Container";
import { Button } from "../../styledComponents/Button";
import { FaSearch } from "react-icons/fa";

export const SearchInput: FC = () => {
  return (
    <Container
      display="flex"
      $align="center"
      $justify="center"
      margin="0 0 0 20%"
    >
      <Input
        width="400px"
        height="25px"
        $borderBottom="1px solid black"
        padding="0 20px"
        $fontSize="20px"
      />
      <Button width="20px" height="fit-content" cursor="pointer">
        <FaSearch color="black" />
      </Button>
    </Container>
  );
};
