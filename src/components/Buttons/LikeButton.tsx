import { FC, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Button } from "../../styledComponents/Button";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/user/selectors";
import { FaCheck } from "react-icons/fa";

import variables from "../../scss/styles.module.scss";

type LikeButtonProps = {
  sku: string | undefined;
};

export const LikeButton: FC<LikeButtonProps> = ({ sku }) => {
  const [gameInFavourites, setGameInFavourites] = useState<boolean>(false);

  const userId = useSelector(selectUserId);

  useEffect(() => {
    const checkGameInFavourites = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/game-check/check-game-in-favourites",
          { userId, sku }
        );

        if (response.data.status === "success") {
          setGameInFavourites(true);
        } else {
          setGameInFavourites(false);
        }
      } catch (err: unknown) {
        if (
          err instanceof AxiosError &&
          err.response &&
          err.response.status !== 500
        ) {
          console.error(err); // Логируем только ошибки, которые не с кодом 500
        }
      }
    };

    checkGameInFavourites();
  }, [userId, sku]);

  const handleAddToFavourite = async () => {
    const gameId = Number(sku);

    setGameInFavourites((prev) => !prev);

    try {
      const response = await axios.post(
        "http://localhost:3000/favourites/add-to-favourites",
        {
          userId,
          gameId,
        }
      );
      if (response.data.status === "success") {
        setGameInFavourites(true);
      }
    } catch (err: unknown) {
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status !== 500
      ) {
        console.error(err);
      }
    }
  };
  return (
    <Button
      className="highlighted"
      $border={`1px solid ${variables.orange}`}
      $borderRadius="20px"
      width="50px"
      height="50px"
      cursor="pointer"
      onClick={gameInFavourites ? null : handleAddToFavourite}
    >
      {gameInFavourites ? <FaCheck color="black" /> : <FaHeart color="black" />}
    </Button>
  );
};
