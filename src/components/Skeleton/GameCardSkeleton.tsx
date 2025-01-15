import { FC } from "react";
import ContentLoader from "react-content-loader";

export const GameCardSkeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={260}
      viewBox="0 0 250 260"
      backgroundColor="#FFD993"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width="250" height="260" />
    </ContentLoader>
  );
};
