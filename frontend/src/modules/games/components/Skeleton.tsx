import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={340}
      viewBox='0 0 340 340'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <rect
        x='0'
        y='0'
        rx='8'
        ry='8'
        width='340'
        height='340'
      />
    </ContentLoader>
  );
};

export { Skeleton };
