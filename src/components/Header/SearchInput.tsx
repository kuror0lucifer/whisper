import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchGames, setQuery } from "../../redux/games/slice";
import { selectQuery } from "../../redux/games/selectors";

import { Input } from "../../styledComponents/Input";
import { Container } from "../../styledComponents/Container";
import { Button } from "../../styledComponents/Button";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

export const SearchInput: FC = () => {
  const query = useSelector(selectQuery);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setQuery(value));
    dispatch(fetchGames(value));
  };

  const handleClear = () => {
    dispatch(setQuery(""));
    dispatch(fetchGames(""));
  };

  return (
    <Container
      display="flex"
      $align="center"
      $justify="center"
      $padding="10px 15px"
      $margin="0 auto"
      $bgColor="#f9f9f9"
      width="50%"
      $maxWidth="500px"
      height="40px"
      $borderRadius="20px"
    >
      <FaSearch color={query ? "black" : "#888"} size={18} />
      <Input
        width="100%"
        $padding="0 10px"
        $fontSize="16px"
        color="black"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
      />
      {query && (
        <Button cursor="pointer" onClick={handleClear}>
          <MdClear color="black" size={18} />
        </Button>
      )}
    </Container>
  );
};
