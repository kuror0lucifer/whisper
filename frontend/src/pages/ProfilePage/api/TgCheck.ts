import apiService from '../../../api/apiService';

export const tgCheckConnection = async (email: string) => {
  try {
    const response = await apiService.post('/api/users/tg-check', { email });

    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred';
  }
};
