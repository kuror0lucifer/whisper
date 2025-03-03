import apiService from '../../../../../api/apiService';

export const fetchUsersInfo = async (userIds: number[]) => {
  try {
    const { data } = await apiService.post('/api/users/user-info', {
      id: userIds,
    });
    if (!data) {
      throw new Error('Error');
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};
