import apiService from '../../../api/apiService';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiService.post(
      '/users/login',
      { email, password },
      {}
    );

    localStorage.setItem('auth_token', response.data.token);
  } catch {
    return 'Authentication error';
  }
};
