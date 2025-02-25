import apiService from '../../../api/apiService';

export const registerUser = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const response = await apiService.post('api/users/registration', {
      email,
      password,
    });

    localStorage.setItem('auth_token', response.data.data.token);
    return response;
  } catch {
    return 'Registration error';
  }
};
