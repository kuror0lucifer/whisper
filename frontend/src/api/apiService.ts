import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(private baseURL: string = 'http://localhost:3000/') {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response && error.response.data) {
          const responseData = error.response.data as { error?: string };

          if (error.response?.status === 403) {
            const tokenExpired = responseData.error === 'Token expired';

            if (tokenExpired) {
              localStorage.removeItem('auth_token');
              window.location.href = '/';
            } else {
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  private createHttpHeaders(): AxiosHeaders {
    const headers = new AxiosHeaders();
    const token = localStorage.getItem('authToken');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async post<T>(route: string, data: T, config?: AxiosRequestConfig) {
    const headers = this.createHttpHeaders();

    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    const response = await this.axiosInstance.post(route, data, {
      ...config,
      headers,
    });
    return response;
  }

  async get<T>(
    route: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const headers = this.createHttpHeaders();
    const response = await this.axiosInstance.get(route, {
      ...config,
      headers,
    });
    return response;
  }

  async patch<T>(route: string, data: T) {
    const headers = this.createHttpHeaders();
    const response = await this.axiosInstance.patch(route, data, { headers });
    return response;
  }

  async put<T>(route: string, data: T) {
    const headers = this.createHttpHeaders();
    const response = await this.axiosInstance.put(route, data, { headers });
    return response;
  }

  async delete(route: string) {
    const headers = this.createHttpHeaders();
    const response = await this.axiosInstance.delete(route, { headers });
    return response.data;
  }
}

export default new ApiService(import.meta.env.VITE_BASE_URL);
