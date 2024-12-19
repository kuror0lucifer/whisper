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
  const itemsPerPage = 8;

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
              width="220px"
              height="260px"
              $margin="0 0 40px 0"
              $bgColor="white"
            >
              <GameCardImg headerImage={game.horizontalHeaderImage} />
              <Flex $justify="space-between" $align="center" $direction="row">
                <GameCardTitle title={game.title} />
                <GameCardPrice
                  price={game.price.finalPrice}
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
        pageCount={Math.ceil(games.length / itemsPerPage)}
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
