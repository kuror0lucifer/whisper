import { FC } from "react";
import { GamePrice } from "./GamePrice";
import { GameDiscountTime } from "./GameDiscountTimeEnd";
import { GameEshopDetails } from "./GameEshopDetails";
import { GamePlatform } from "./GamePlatform";
import { GameReleasDate } from "./GameReleasDate";
import { GamePlayModes } from "./GamePlayModes";
import { GamePlayersCount } from "./GamePlayersCount";
import { Flex } from "../../../styledComponents/Flex";
import { Span } from "../../../styledComponents/Span";
import Price from "../../../@types/price";
import EshopDetails from "../../../@types/eshopDetails";
import { GameGenres } from "./GameGenres";
import { GameDLC } from "./GameDLC";

type GameDetailsProps = {
  price: Price | undefined;
  platforms: string[] | undefined;
  eshopDetails: EshopDetails | undefined;
  date: string | undefined;
  playModes: string[] | undefined;
  players: string | undefined;
  genres: string[] | undefined;
  hasDlc: boolean | undefined;
};

export const GameDetails: FC<GameDetailsProps> = ({
  price,
  platforms,
  eshopDetails,
  date,
  playModes,
  players,
  genres,
  hasDlc,
}) => {
  const sections = [
    {
      title: "Sale Details",
      content: (
        <>
          <GamePrice price={price} platforms={platforms} />
          <GameDiscountTime eshopDetails={eshopDetails} />
          <GameEshopDetails eshopDetails={eshopDetails} />
        </>
      ),
    },
    {
      title: "Game Information",
      content: (
        <>
          <GamePlatform platforms={platforms} />
          <GameReleasDate date={date} />
          <GamePlayModes playModes={playModes} />
        </>
      ),
    },
    {
      title: "Game Details",
      content: (
        <>
          <GamePlayersCount players={players} />
          <GameGenres genres={genres} />
          <GameDLC hasDlc={hasDlc} />
        </>
      ),
    },
  ];

  return (
    <Flex
      $align="flex-start"
      $direction="row"
      $justify="space-between"
      $margin="25px 25px 0 25px"
      $gap="10px"
    >
      {sections.map(({ title, content }) => (
        <Flex key={title} $direction="column" $wrap="nowrap">
          <Span
            $size="28px"
            $weight="800"
            $marginTop="20px"
            $marginBottom="20px"
            $align="center"
          >
            {title}
          </Span>
          {content}
        </Flex>
      ))}
    </Flex>
  );
};
