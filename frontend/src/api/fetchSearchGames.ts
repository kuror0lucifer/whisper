import axios from 'axios';
import { Game } from '../types/game.type';

export const fetchGamesFromSearch = async (
  value: string,
  page: number,
  itemsPerPage: number
): Promise<[Game[], number]> => {
  try {
    const data = {
      requests: [
        {
          indexName: 'store_all_products_en_us',
          params: new URLSearchParams({
            query: value || '',
            ...(value ? {} : { filters: 'price.salePrice>0' }),
            page: page.toString(),
            hitsPerPage: itemsPerPage.toString(),
            facetFilters: JSON.stringify([
              'topLevelCategory:Games',
              'nsuid:-MOBILE',
            ]),
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

    const filteredGames = response.data.results[0].hits.filter(
      (game: Game) => game.nsuid !== null
    );

    const nbPages = response.data?.results[0].nbPages;

    return [filteredGames, nbPages];
  } catch {
    return [[], 0];
  }
};
