import axios, { AxiosError } from 'axios'

export type ErrorResponse = {
  error: string
  details?: string[]
}

export default class BaseApiService {
  protected static apiUrl: string = import.meta.env.VITE_API_BASE_URL

  protected static client() {
    return axios.create({
      baseURL: this.apiUrl
    })
  }

  protected static async get<T>(url: string): Promise<T> {
    try {
      const response = await this.client().get(url)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        return axiosError.response.data as T
      } else {
        throw error
      }
    }
  }

  protected static async post<T>(params: { url: string; data: any }): Promise<T> {
    try {
      const response = await this.client().post(params.url, params.data)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      return axiosError.response?.data as T
    }
  }

  protected static async put<T>(params: { url: string; data?: any }): Promise<T> {
    try {
      const response = await this.client().put(params.url, params.data)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      return axiosError.response?.data as T
    }
  }

  protected static async delete<T>(params: { url: string }): Promise<T> {
    try {
      const response = await this.client().delete(params.url)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      return axiosError.response?.data as T
    }
  }
}
