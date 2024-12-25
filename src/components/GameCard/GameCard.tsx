import { useEffect, useState } from "react";
import { getQueriedGamesAmerica, QueriedGameUS } from "nintendo-switch-eshop";
import { Flex } from "../../styledComponents/Flex";
import { Container } from "../../styledComponents/Container";
import { GameCardImg } from "./GameCardImg";
import { GameCardPrice } from "./GameCardPrice";
import { GameCardTitle } from "./GameCardTitle";
import ReactPaginate from "react-paginate";

import "../../scss/components/paginate.scss";
import { useSelector } from "react-redux";
import { selectGames, selectQuery } from "../../redux/games/selectors";

export const GameCard = () => {
  const [allGames, setAllGames] = useState<QueriedGameUS[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 8;

  const games = useSelector(selectGames);
  const query = useSelector(selectQuery);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getQueriedGamesAmerica("");
        setAllGames(gamesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGames();
  }, []);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const currentGames = query.trim() ? games : allGames;

  const paginatedGames = currentGames.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <Flex
        $justify="center"
        $gap="20px"
        $align="center"
        $direction="row"
        height="fit-content"
        $wrap="wrap"
        $margin="25px auto"
        width="80%"
      >
        {paginatedGames.map((game, index) => {
          return (
            <Container
              key={game.objectID || `fallback-${index}`}
              width="250px"
              height="260px"
              $bgColor="white"
            >
              <GameCardImg
                headerImage={
                  game.boxart ? game.boxart : game.horizontalHeaderImage
                }
              />
              <Flex
                $justify="space-around"
                $align="flex-start"
                $direction="row"
              >
                <GameCardTitle title={game.title} />
                <GameCardPrice
                  price={game.price}
                  availability={
                    game.availability.length > 0
                      ? game.availability
                      : "Бесплатно"
                  }
                />
              </Flex>
            </Container>
          );
        })}
      </Flex>
      <ReactPaginate
        pageCount={Math.ceil(currentGames.length / itemsPerPage)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="Назад"
        nextLabel="Вперед"
      />
    </>
  );
};
