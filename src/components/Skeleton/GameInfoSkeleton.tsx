import { FC } from "react";
import ContentLoader from "react-content-loader";

export const GameInfoSkeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={1200}
      height={800}
      viewBox="0 0 1200 800"
      backgroundColor="#FFD993"
      foregroundColor="#ecebeb"
    >
      <rect x="25" y="20" rx="8" ry="8" width="600" height="40" />

      <rect x="25" y="80" rx="8" ry="8" width="500" height="300" />
      <rect x="550" y="80" rx="8" ry="8" width="450" height="300" />
      <rect x="1150" y="80" rx="8" ry="8" width="50" height="50" />

      <rect x="25" y="400" rx="8" ry="8" width="450" height="1000" />
    </ContentLoader>
  );
};
