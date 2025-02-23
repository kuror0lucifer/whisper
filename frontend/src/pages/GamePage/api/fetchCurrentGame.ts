import { Game } from '../../../types/game.type';
import axios from 'axios';

export const fetchCurrentGame = async (
  nsuid: string
): Promise<Game[] | string | undefined> => {
  try {
    const data = {
      requests: [
        {
          indexName: 'store_all_products_en_us',
          params: new URLSearchParams({
            hitsPerPage: '1',
            filters: `nsuid:"${nsuid}"`,
          }).toString(),
        },
      ],
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Algolia-API-Key': 'a29c6927638bfd8cee23993e51e721c9',
      'X-Algolia-Application-Id': 'U3B6GR4UA3',
    };

    const response = await axios.post(
      'https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries',
      data,
      { headers }
    );

    return response.data?.results[0].hits;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred';
  }
};
