import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';

export const TabletopIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      role='presentation'
      color={color}
    >
      <path
        d='M31.32 18.242l-2.657-6.94-1.285 6.94h3.943zM28.174 5.336H6.418l-2.74 12.906h21.754l2.741-12.906zm-5.035 10.505H6.99l1.722-8.094h16.143l-1.717 8.094zm-21.741 5.03H0v.995h.02a.098.098 0 0 0-.02.059v2.008a2.734 2.734 0 0 0 2.736 2.731h7.426a2.737 2.737 0 0 0 2.741-2.731v-2.008a.18.18 0 0 0-.01-.06h.01v-.994H1.397zm7.64.31a1 1 0 1 1-1.004 1.002c0-.554.45-1.002 1.004-1.001zm-5.845 4.43a1.837 1.837 0 1 1 1.858-1.833c-.003.49-.2.958-.55 1.302a1.839 1.839 0 0 1-1.308.53zm3.24-1.833a1.009 1.009 0 0 1 1.004-.985.981.981 0 1 1-1.004.985zm2.605 2.57a.983.983 0 1 1 .99-.978.988.988 0 0 1-.99.977zm1.591-1.591a.982.982 0 1 1 0-1.964.982.982 0 1 1 0 1.964zM32 20.87H19.097v.995h.02a.098.098 0 0 0-.02.059v2.008a2.73 2.73 0 0 0 2.731 2.731h7.431A2.738 2.738 0 0 0 32 23.933v-2.009a.18.18 0 0 0-.01-.06H32v-.994zm-3.866.31a1 1 0 0 1-.006 1.999.999.999 0 1 1 .006-1.998zm-5.85 4.43a1.836 1.836 0 0 1 0-3.673 1.837 1.837 0 1 1 0 3.672zm3.24-1.833c.015-.545.459-.98 1.004-.985a.981.981 0 1 1 0 1.964c-.544 0-.99-.434-1.004-.979zm2.61 2.57a.983.983 0 1 1 .99-.978.988.988 0 0 1-.99.977zm1.586-1.591a.982.982 0 1 1 0-1.964.982.982 0 1 1 0 1.964z'
        fill={color}
        fillRule='evenodd'
      ></path>
    </svg>
  );
};
