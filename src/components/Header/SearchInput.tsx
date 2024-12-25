import { ChangeEvent, FC } from "react";
import { Input } from "../../styledComponents/Input";
import { Container } from "../../styledComponents/Container";
import { Button } from "../../styledComponents/Button";
import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchGames, setQuery } from "../../redux/games/slice";
import { selectQuery } from "../../redux/games/selectors";

export const SearchInput: FC = () => {
  const query = useSelector(selectQuery);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setQuery(value));
    dispatch(fetchGames(value));
  };

  return (
    <Container
      display="flex"
      $align="center"
      $justify="center"
      $margin="0 0 0 20%"
    >
      <Input
        width="400px"
        height="25px"
        $borderBottom="1px solid black"
        $padding="0 20px"
        $fontSize="20px"
        value={query}
        onChange={handleInputChange}
      />
      <Button width="20px" height="fit-content" cursor="pointer">
        <FaSearch color="black" />
      </Button>
    </Container>
  );
};
