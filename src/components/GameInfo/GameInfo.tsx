import { FC, useEffect, useState } from "react";
import { Container } from "../../styledComponents/Container";
import { Header } from "../Header/Header";
import { GameUS, getGamesAmerica } from "nintendo-switch-eshop";
import { useParams } from "react-router-dom";
import { TitleH1 } from "../../styledComponents/TitleH1";
import { Image } from "../../styledComponents/Image";
import { Flex } from "../../styledComponents/Flex";
import { Span } from "../../styledComponents/Span";

export const GameInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameInfo, setGameInfo] = useState<GameUS>();

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const games = await getGamesAmerica();
        const game = games.find((game) => game.nsuid === id);
        setGameInfo(game);
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
        <TitleH1>{gameInfo?.title}</TitleH1>

        <Flex
          $align="flex-start"
          $direction="row"
          $justify="space-around"
          $margin="40px 0 0 0"
        >
          <Image src={gameInfo?.horizontalHeaderImage} width="40%" />
          <Container width="50%">
            <Span>{gameInfo?.description}</Span>
          </Container>
        </Flex>
      </Container>
    </>
  );
};
