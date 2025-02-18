import apiService from '../../../api/apiService';
import { Game } from '../../../types/game.type';

export const fetchGames = async (
  itemsPerPage: number,
  page: number
): Promise<[Game[], number]> => {
  try {
    const data = {
      requests: [
        {
          indexName: 'store_all_products_en_us',
          params: `filters=price.salePrice>0&hitsPerPage=${itemsPerPage}&page=${page}`,
        },
      ],
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Algolia-API-Key': 'a29c6927638bfd8cee23993e51e721c9',
      'X-Algolia-Application-Id': 'U3B6GR4UA3',
    };

    const response = await apiService.post(
      'https://U3B6GR4UA3-dsn.algolia.net/1/indexes/*/queries',
      data,
      headers
    );

    return [response.data?.results[0].hits, response.data?.results[0].nbPages];
  } catch {
    return [[], 0];
  }
};
