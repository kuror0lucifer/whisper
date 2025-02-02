import { useEffect, useState } from "react";
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
import axios from "axios";
import Price from "../../@types/price";

interface Game {
  nsuid: string;
  sku: string;
  productImage: string;
  title: string;
  price: Price;
  availability: string;
}

export const GameCard = () => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [nbPages, setNbPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 50;
  const baseImgUrl = "https://assets.nintendo.com/image/upload/";

  const navigate = useNavigate();

  const games = useSelector(selectGames);
  const query = useSelector(selectQuery);

  const fetchGames = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries",
        {
          requests: [
            {
              indexName: "store_all_products_en_us",
              params: `query=&hitsPerPage=${itemsPerPage}&page=${page}&filters=price.salePrice>0`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Algolia-API-Key": "a29c6927638bfd8cee23993e51e721c9",
            "X-Algolia-Application-Id": "U3B6GR4UA3",
          },
        }
      );
      const hits = (response.data.results?.[0]?.hits as Game[]) || [];

      const uniqueHits = Array.from(
        hits
          .reduce((map, game) => {
            if (!map.has(game.title)) {
              map.set(game.title, game);
            }
            return map;
          }, new Map())
          .values()
      );
      setAllGames(uniqueHits);
      setNbPages(response.data.results?.[0]?.nbPages || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(currentPage);
  }, [currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected;
    const maxPage = nbPages - 1;
    setCurrentPage(selectedPage > maxPage ? maxPage : selectedPage);
  };

  const currentGames = query.trim() ? games : allGames;

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
          : currentGames.map((game) => {
              return (
                <Container
                  className="highlighted"
                  key={game.nsuid}
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
                    headerImage={baseImgUrl + game.productImage}
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
                        game.availability?.length > 0
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
          pageCount={nbPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel="Назад"
          nextLabel="Вперед"
          forcePage={currentPage}
        />
      )}
    </>
  );
};
