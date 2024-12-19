import { useEffect, useState } from "react";
import { getQueriedGamesAmerica, QueriedGameUS } from "nintendo-switch-eshop";
import { Flex } from "../../styledComponents/Flex";
import { Container } from "../../styledComponents/Container";
import { GameCardImg } from "./GameCardImg";
import { GameCardPrice } from "./GameCardPrice";
import { GameCardTitle } from "./GameCardTitle";
import ReactPaginate from "react-paginate";

import "../../scss/paginate.scss";

export const GameCard = () => {
  const [games, setGames] = useState<QueriedGameUS[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10;
  const totalPages = 100;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getQueriedGamesAmerica("");
        setGames(gamesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGames();
  }, [currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const paginatedGames = games.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  console.log(games);

  return (
    <>
      <Flex
        $justify="space-between"
        $align="center"
        $direction="row"
        height="fit-content"
        $wrap="wrap"
        $margin="0 auto"
        width="80%"
      >
        {paginatedGames.map((game) => {
          return (
            <Container
              key={game.nsuid + Math.random()}
              width="190px"
              height="372px"
              $margin="0 0 40px 0"
            >
              <GameCardImg boxart={game.horizontalHeaderImage} />
              <GameCardTitle title={game.title} />
              <GameCardPrice
                price={
                  game.price === null ? "Бесплатно" : game.price.finalPrice
                }
              />
            </Container>
          );
        })}
      </Flex>
      <ReactPaginate
        pageCount={totalPages}
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
