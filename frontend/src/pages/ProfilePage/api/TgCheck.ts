import apiService from '../../../api/apiService';

export const tgCheckConnection = async (email: string) => {
  try {
    const response = await apiService.post('/telegram-id/tg-check', { email });

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred';
  }
};
