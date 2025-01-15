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
import { GameDiscountTime } from "./GameDiscountTimeEnd";
import eshopDetails from "../../@types/eshopDetails";
import { GameEshopDetails } from "./GameEshopDetails";
import { GamePlayersCount } from "./GamePlayersCount";
import { GamePlatform } from "./GamePlatform";

type GameInfoResponse = {
  title: string;
  nsuid: string;
  productImage: string;
  description: string;
  price: Price;
  players: string;
  date: string;
  eshopDetails: eshopDetails;
  platforms: string[];
};

export const GameInfo: FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const [gameInfo, setGameInfo] = useState<GameInfoResponse>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.post(
          "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/store_all_products_en_us/query",
          {
            params: `filters=sku:${sku}`,
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
          players: game.playerCount,
          date: game.releaseDateDisplay
            ? game.releaseDateDisplay
            : game.releaseDate.slice(0, 10),
          eshopDetails: game.eshopDetails,
          platforms: game.corePlatforms,
        });
      } catch (err) {
        setError(`Failed to load game information. ${err}`);
      }
    };

    fetchGameInfo();
  }, [sku]);

  if (error) {
    return <Error message={error} />;
  }

  const isDescriptionPresent = gameInfo?.description;

  const content = (
    <Flex
      $align="flex-start"
      $direction="column"
      $justify="flex-start"
      $margin={isDescriptionPresent ? "25px 25px 0 25px" : ""}
      $gap="10px"
    >
      <GamePrice price={gameInfo?.price} platforms={gameInfo?.platforms} />
      <GamePlatform platforms={gameInfo?.platforms} />
      <GamePlayersCount players={gameInfo?.players} />
      <GameDiscountTime eshopDetails={gameInfo?.eshopDetails} />
      <GameEshopDetails eshopDetails={gameInfo?.eshopDetails} />
      <GameReleasDate date={gameInfo?.date} />
    </Flex>
  );

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
          $justify="space-between"
          $margin="40px 25px 0 25px"
        >
          <Image
            src={
              "https://assets.nintendo.com/image/upload/" +
              gameInfo?.productImage
            }
            alt={gameInfo?.title}
            width="40%"
            height="248px"
          />
          {isDescriptionPresent ? (
            <GameDescription gameDescription={gameInfo.description} />
          ) : (
            content
          )}
        </Flex>
        {isDescriptionPresent && content}
      </Container>
    </>
  );
};
