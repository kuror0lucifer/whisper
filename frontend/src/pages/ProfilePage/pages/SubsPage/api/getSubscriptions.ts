import apiService from '../../../../../api/apiService';

export const getSubscriptions = async (userId: number) => {
  try {
    const response = await apiService.post(
      '/api/subscriptions/get-subscriptions',
      { userId }
    );

    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};
