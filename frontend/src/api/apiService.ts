import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance;

  constructor(private baseURL: string = 'http://localhost:3000') {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  async post<T>(route: string, data: T) {
    const response = await this.axiosInstance.post(route, data);
    return response;
  }

  async get<T>(
    route: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get(route, {
      ...config,
    });
    return response;
  }

  async put<T>(route: string, data: T) {
    const response = await this.axiosInstance.put(route, data);
    return response;
  }

  async delete(route: string) {
    const response = await this.axiosInstance.delete(route);
    return response.data;
  }
}

export default new ApiService(import.meta.env.VITE_BASE_URL);
