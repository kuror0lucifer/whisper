import apiService from '../../../../../api/apiService';

export const changeName = async (id: number, userName: string) => {
  try {
    const response = await apiService.patch('api/users/changeName', {
      id,
      userName,
    });

    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred';
  }
};
