import React, { useState } from "react";
import { getQueriedGamesAmerica, QueriedGameUS } from "nintendo-switch-eshop";
import { Flex } from "../../styledComponents/Flex";
import { Container } from "../../styledComponents/Container";
import { GameCardImg } from "./GameCardImg";
import { GameCardPrice } from "./GameCardPrice";
import { GameCardTitle } from "./GameCardTitle";

export const GameCard = () => {
  const [games, setGames] = useState<QueriedGameUS[]>([]);

  React.useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getQueriedGamesAmerica("");
        setGames(gamesData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGames();
  }, []);

  return (
    <Flex
      $justify="space-between"
      $align="center"
      $direction="row"
      height="fit-content"
      $wrap="wrap"
    >
      {games.map((game) => {
        return (
          <Container
            key={game.nsuid + Math.random()}
            width="190px"
            height="372px"
            $margin="0 0 40px 0"
          >
            <GameCardImg boxart={game.boxart} />
            <GameCardTitle title={game.title} />
            <GameCardPrice
              price={game.price === null ? "Бесплатно" : game.price.finalPrice}
            />
          </Container>
        );
      })}
    </Flex>
  );
};
