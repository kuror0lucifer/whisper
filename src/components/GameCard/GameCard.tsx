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
import { useNavigate } from "react-router-dom";
import { GameCardSkeleton } from "../Skeleton/GameCardSkeleton";

export const GameCard = () => {
  const [allGames, setAllGames] = useState<QueriedGameUS[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  const games = useSelector(selectGames);
  const query = useSelector(selectQuery);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const gamesData = await getQueriedGamesAmerica("");
        setAllGames(gamesData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
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
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))
          : paginatedGames.map((game, index) => {
              return (
                <Container
                  className="highlighted"
                  key={game.nsuid || `fallback-${index}`}
                  width="250px"
                  height="260px"
                  $bgColor="white"
                  $boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                  cursor="pointer"
                  onClick={() => {
                    navigate(`/game/${game.sku}`);
                  }}
                >
                  <GameCardImg
                    headerImage={
                      "https://assets.nintendo.com/image/upload/" +
                      game.productImage
                    }
                    title={game.title}
                    price={game.price}
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
                          : "Free"
                      }
                    />
                  </Flex>
                </Container>
              );
            })}
      </Flex>
      {!isLoading && (
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
      )}
    </>
  );
};
