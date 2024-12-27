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
  const [gameDescription, setGameDescription] = useState<GameUS>();
  const [gameInfo, setGameInfo] = useState<QueriedGameUS>();

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const descriptions = await getGamesAmerica();
        const infos = await getQueriedGamesAmerica("");
        const description = descriptions.find(
          (description) => description.nsuid === id
        );
        const info = infos.find((info) => info.nsuid === id);
        setGameDescription(description);
        setGameInfo(info);
        console.log(description);
        console.log(info);
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
            src={
              "https://assets.nintendo.com/image/upload/" +
              gameInfo?.productImage
            }
            alt={gameInfo?.title}
            width="40%"
          />

          <GameDescription gameDescription={gameDescription?.description} />
        </Flex>
        <GamePrice price={gameInfo?.price} />
      </Container>
    </>
  );
};
