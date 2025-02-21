import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(private baseURL: string = 'http://localhost:3000') {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 403) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  async post<T>(route: string, data: T, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post(route, data, config);
    return response;
  }

  async get<T>(
    route: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get(route, config);
    return response;
  }

  async put<T>(route: string, data: T, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.put(route, data, config);
    return response;
  }

  async delete(route: string, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.delete(route, config);
    return response.data;
  }

  setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    localStorage.removeItem('auth_token');
    delete this.axiosInstance.defaults.headers['Authorization'];
  }
}

export default new ApiService(import.meta.env.VITE_BASE_URL);
