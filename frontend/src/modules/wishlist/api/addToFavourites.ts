import { AxiosError } from 'axios';
import apiService from '../../../api/apiService';

export const addToFavourites = async (userId: number, nsuid: string) => {
  try {
    const response = await apiService.post(
      '/api/favourites/add-to-favourites',
      {
        userId,
        nsuid,
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(
      err instanceof AxiosError ? err.response?.data?.message : 'Unknown error'
    );
  }
};

export const checkGame = async (
  userId: number,
  nsuid: string,
  config?: { signal?: AbortSignal }
) => {
  try {
    const response = await apiService.post(
      '/api/favourites/check-game',
      {
        userId,
        nsuid,
      },
      config
    );

    return response;
  } catch (err) {
    throw new Error(
      err instanceof AxiosError ? err.response?.data?.message : 'Unknown error'
    );
  }
};
