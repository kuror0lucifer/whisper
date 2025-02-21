import apiService from '../../../api/apiService';

export const tgConnection = async (userId: number) => {
  try {
    const response = await apiService.post('/tg-token/generate-token', {
      userId,
    });

    const link = `https://t.me/whisper64Bot?start=${response.data.token}`;
    window.location.href = link;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred';
  }
};
