import apiService from '../../../../../api/apiService';

export const changeAvatar = async (userId: number, file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await apiService.post(
      `/api/users/avatar/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};
