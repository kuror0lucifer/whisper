import { FC, useEffect, useState } from "react";
import { Container } from "../../styledComponents/Container";
import { Header } from "../Header/Header";
import {
  GameUS,
  getGamesAmerica,
  getQueriedGamesAmerica,
  QueriedGameUS,
} from "nintendo-switch-eshop";
import { useParams } from "react-router-dom";
import { TitleH } from "../../styledComponents/TitleH";
import { Image } from "../../styledComponents/Image";
import { Flex } from "../../styledComponents/Flex";
import { GameDescription } from "./GameDescription";
import { GamePrice } from "./GamePrice";

export const GameInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameInfo, setGameInfo] = useState<GameUS>();
  const [gamePrice, setGamePrice] = useState<QueriedGameUS>();

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const games = await getGamesAmerica();
        const prices = await getQueriedGamesAmerica("");
        const game = games.find((game) => game.nsuid === id);
        const price = prices.find((price) => price.nsuid === id);
        setGameInfo(game);
        setGamePrice(price);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGameInfo();
  }, [id]);

  return (
    <>
      <Header />
      <Container width="80%" height="100vh" $margin="25px auto" $bgColor="gray">
        <TitleH as="h1" $margin="0 0 0 25px">
          {gameInfo?.title}
        </TitleH>

        <Flex
          $align="flex-start"
          $direction="row"
          $justify="space-around"
          $margin="40px 0 0 0"
        >
          <Image
            src={gameInfo?.horizontalHeaderImage}
            alt={gameInfo?.title}
            width="40%"
          />

          <GameDescription gameDescription={gameInfo?.description} />
        </Flex>
        <GamePrice price={gamePrice?.price} />
      </Container>
    </>
  );
};
