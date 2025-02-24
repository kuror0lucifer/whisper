import apiService from '../../../api/apiService';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiService.post('api/users/login', {
      email,
      password,
    });

    console.log(response);

    localStorage.setItem('auth_token', response.data.data.token);
    return response.data;
  } catch {
    return 'Authentication error';
  }
};
