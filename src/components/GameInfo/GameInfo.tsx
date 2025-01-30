import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Container } from "../../styledComponents/Container";
import { Header } from "../Header/Header";
import { TitleH } from "../../styledComponents/TitleH";
import { Image } from "../../styledComponents/Image";
import { Flex } from "../../styledComponents/Flex";
import { GameDescription } from "./GameDetails/GameDescription";
import { GamePrice } from "./GameDetails/GamePrice";
import { GameReleasDate } from "./GameDetails/GameReleasDate";
import { Error } from "../ErrorPage/Error";
import { LikeButton } from "../Buttons/LikeButton";
import { GameInfoSkeleton } from "../Skeleton/GameInfoSkeleton";
import { GamePlatform } from "./GameDetails/GamePlatform";
import { Span } from "../../styledComponents/Span";
import { GamePlayersCount } from "./GameDetails/GamePlayersCount";
import { GamePlayModes } from "./GameDetails/GamePlayModes";
import { GameDiscountTime } from "./GameDetails/GameDiscountTimeEnd";
import { GameEshopDetails } from "./GameDetails/GameEshopDetails";

import Price from "../../@types/price";
import eshopDetails from "../../@types/eshopDetails";

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
  playModes: string[];
};

interface AuthTokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const GameInfo: FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const [gameInfo, setGameInfo] = useState<GameInfoResponse>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        setIsLoading(true);

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
        console.log(data);

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
          playModes: game.playModes,
        });
      } catch (err) {
        setError(`Failed to load game information. ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameInfo();
  }, [sku]);

  const addToFavourite = async () => {
    const gameId = Number(sku);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const payload: AuthTokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      const response = await axios.post(
        "http://localhost:3000/favourites/add-to-favourites",
        {
          userId,
          gameId,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <Error message={error} />;
  }

  const isDescriptionPresent = gameInfo?.description;

  const content = (
    <Flex
      $align="flex-start"
      $direction="column"
      $justify="flex-start"
      $margin="25px 25px 0 25px"
      $gap="10px"
    >
      <Span $size="28px" $weight="800" $marginTop="20px">
        Details
      </Span>
      <Flex $direction="column" $wrap="nowrap">
        <GamePrice price={gameInfo?.price} platforms={gameInfo?.platforms} />
        <GamePlatform platforms={gameInfo?.platforms} />
        <GamePlayersCount players={gameInfo?.players} />
        <GamePlayModes playModes={gameInfo?.playModes} />
        <GameDiscountTime eshopDetails={gameInfo?.eshopDetails} />
        <GameEshopDetails eshopDetails={gameInfo?.eshopDetails} />
        <GameReleasDate date={gameInfo?.date} />
      </Flex>
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
        {isLoading ? (
          <GameInfoSkeleton />
        ) : (
          <>
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
                width="500px"
                height="300px"
              />
              {isDescriptionPresent ? (
                <>
                  <GameDescription gameDescription={gameInfo.description} />
                  <LikeButton addToFavourite={addToFavourite} />
                </>
              ) : (
                <>
                  <Flex width="45%" $align="flex-start" $justify="flex-start">
                    <Span $size="22px">{`No description :(`}</Span>
                  </Flex>
                  <LikeButton addToFavourite={addToFavourite} />
                </>
              )}
            </Flex>
            {content}
          </>
        )}
      </Container>
    </>
  );
};
