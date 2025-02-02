import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Container } from "../../styledComponents/Container";
import { Header } from "../Header/Header";
import { TitleH } from "../../styledComponents/TitleH";
import { Image } from "../../styledComponents/Image";
import { Flex } from "../../styledComponents/Flex";
import { GameDescription } from "./GameDetails/GameDescription";
import { Error } from "../ErrorPage/Error";
import { LikeButton } from "../Buttons/LikeButton";
import { GameInfoSkeleton } from "../Skeleton/GameInfoSkeleton";
import { Span } from "../../styledComponents/Span";
import { getAuthToken } from "../../utils/getAuthToken";

import Price from "../../@types/price";
import eshopDetails from "../../@types/eshopDetails";
import { GameDetails } from "./GameDetails/GameDetails";
import { getQueriedGamesAmerica } from "nintendo-switch-eshop";

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
  genres: string[];
  hasDlc: boolean;
};

export const GameInfo: FC = () => {
  const { sku } = useParams<{ sku: string }>();
  const [gameInfo, setGameInfo] = useState<GameInfoResponse>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const test = getQueriedGamesAmerica(`${gameInfo?.title}`);
  console.log(test);

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
        const game = response.data.hits?.[0];

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
          genres: game.genres,
          hasDlc: game.hasDlc,
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
      const payload = getAuthToken();
      const userId = payload?.id;

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
            <GameDetails
              price={gameInfo?.price}
              platforms={gameInfo?.platforms}
              playModes={gameInfo?.playModes}
              players={gameInfo?.players}
              date={gameInfo?.date}
              eshopDetails={gameInfo?.eshopDetails}
              genres={gameInfo?.genres}
              hasDlc={gameInfo?.hasDlc}
            />
          </>
        )}
      </Container>
    </>
  );
};
