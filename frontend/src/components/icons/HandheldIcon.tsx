import { FC } from 'react';
import { IconProps } from '../types/iconProps.type';

export const HandheldIcon: FC<IconProps> = ({ size, color }) => {
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
        d='M28.812 8.455h-2.353c-.014 0-.038.009-.052.009v-.01H5.621v.014c-.028-.004-.061-.013-.07-.013H3.192A3.196 3.196 0 0 0 0 11.65v8.696a3.203 3.203 0 0 0 3.193 3.198H5.55c.01 0 .043-.01.07-.015v.015h20.787v-.015a.163.163 0 0 0 .052.015h2.353A3.195 3.195 0 0 0 32 20.346V11.65a3.187 3.187 0 0 0-3.188-3.196zm-.183 1.973a1.014 1.014 0 1 1-1.012 1.012 1.006 1.006 0 0 1 1.012-1.012zm.994 4.276a1.003 1.003 0 1 1-2.005-.021 1.003 1.003 0 0 1 2.005.021zM3.521 10.428a1.89 1.89 0 1 1-.703 3.639 1.892 1.892 0 0 1-1.168-1.755c0-1.035.835-1.877 1.87-1.884zm1.007 6.22a1.001 1.001 0 0 1-1.509.882 1.007 1.007 0 0 1-.497-.882 1.024 1.024 0 0 1 .999-1.026 1.03 1.03 0 0 1 1.007 1.026zM.896 18.29a1.003 1.003 0 1 1 2.006.018 1.003 1.003 0 0 1-2.006-.018zm2.625 2.636a1.012 1.012 0 0 1-.725-1.727 1.013 1.013 0 0 1 1.732.713 1.008 1.008 0 0 1-1.007 1.014zm1.636-1.623a1.02 1.02 0 1 1-.004-2.04 1.02 1.02 0 0 1 .004 2.04zm20.092 1.42H6.774v-9.45H25.25v9.45zm.722-7.66a1.021 1.021 0 1 1 2.043.009 1.021 1.021 0 0 1-2.043-.009zm2.658 7.863a1.892 1.892 0 1 1 1.866-1.88 1.88 1.88 0 0 1-1.866 1.88zm1.622-6.836a1.019 1.019 0 0 1-.748-1.726 1.018 1.018 0 1 1 .748 1.726z'
        fill={color}
      ></path>
    </svg>
  );
};
