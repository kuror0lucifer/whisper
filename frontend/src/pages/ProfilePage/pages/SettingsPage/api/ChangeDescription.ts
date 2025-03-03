import apiService from '../../../../../api/apiService';

export const changeDescription = async (
  userId: number,
  description: string
) => {
  try {
    const response = await apiService.post('/api/users/change-description', {
      userId,
      description,
    });

    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};
