import { FC, useEffect, useState } from "react";
import { Container } from "../../styledComponents/Container";
import { Header } from "../Header/Header";
import { useParams } from "react-router-dom";
import { TitleH } from "../../styledComponents/TitleH";
import { Image } from "../../styledComponents/Image";
import { Flex } from "../../styledComponents/Flex";
import { GameDescription } from "./GameDescription";
import { GamePrice } from "./GamePrice";

import axios from "axios";
import { GameReleasDate } from "./GameReleasDate";
import { Error } from "../ErrorPage/Error";
import Price from "../../@types/price";

type GameInfoResponse = {
  title: string;
  nsuid: string;
  productImage: string;
  description: string;
  price: Price;
  date: string;
};

export const GameInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameInfo, setGameInfo] = useState<GameInfoResponse>();
  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.post(
          "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/store_all_products_en_us/query",
          {
            params: `filters=nsuid:${id}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Algolia-API-Key": "a29c6927638bfd8cee23993e51e721c9",
              "X-Algolia-Application-Id": "U3B6GR4UA3",
            },
          }
        );

        const data = response.data;

        const game = data.hits[0];
        setGameInfo({
          title: game.title,
          nsuid: game.nsuid,
          productImage: game.productImage,
          description: game.description || "",
          price: game.price,
          date: game.releaseDateDisplay
            ? game.releaseDateDisplay
            : game.releaseDate.slice(0, 10),
        });
      } catch (err: unknown) {
        setError(err);
      }
    };

    fetchGameInfo();
  }, [id]);

  if (error !== null) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <Container
        width="80%"
        height="100vh"
        $margin="25px auto"
        $bgColor="inherit"
      >
        <TitleH as="h1" $margin="0 0 0 25px">
          {gameInfo?.title}
        </TitleH>

        <Flex
          $align="flex-start"
          $direction="row"
          $justify="flex-start"
          $margin="40px 25px 0 25px"
          $gap="50px"
        >
          <Image
            src={
              "https://assets.nintendo.com/image/upload/" +
              gameInfo?.productImage
            }
            alt={gameInfo?.title}
            width="40%"
          />

          <GameDescription gameDescription={gameInfo?.description} />
          <GamePrice price={gameInfo?.price} />
          <GameReleasDate date={gameInfo?.date} />
        </Flex>
      </Container>
    </>
  );
};
