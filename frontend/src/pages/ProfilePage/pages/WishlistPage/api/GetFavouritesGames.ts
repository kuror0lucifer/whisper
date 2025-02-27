import apiService from '../../../../../api/apiService';
import { algoliasearch } from 'algoliasearch';

export const getFavouriteGames = async (userId: number) => {
  try {
    const response = await apiService.post('/api/favourites/get-favourites', {
      userId,
    });

    return response.data.gameIds;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};

export const fetchFavouriteGames = async (userId: number) => {
  try {
    const gameIds = await getFavouriteGames(userId);

    if (Array.isArray(gameIds)) {
      const client = algoliasearch(
        'U3B6GR4UA3',
        'a29c6927638bfd8cee23993e51e721c9'
      );
      const filters = `nsuid:${gameIds.join(' OR nsuid:')}`;

      const response = await client.searchForHits({
        requests: [{ indexName: 'store_all_products_en_us', query: filters }],
      });

      return response.results[0]; // Возвращаем только первый результат
    } else {
      return gameIds; // В случае ошибки вернем строку с ошибкой
    }
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};
