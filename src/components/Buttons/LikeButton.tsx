import { FC } from "react";
import { Button } from "../../styledComponents/Button";
import { FaHeart } from "react-icons/fa";
import variables from "../../scss/styles.module.scss";

export const LikeButton: FC = () => {
  return (
    <Button
      className="highlighted"
      $border={`1px solid ${variables.orange}`}
      $borderRadius="20px"
      width="50px"
      height="50px"
      cursor="pointer"
    >
      <FaHeart color="black" />
    </Button>
  );
};
