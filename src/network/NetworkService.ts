import { useAuthStore } from '@/store/authStore'
import { SuccessResponse } from '@/utils/types'
import axios from 'axios'

// const apiUrl = 'https://devapi.mojigurukul.com/api'
const apiUrl = 'https://devapi.nukulum.com/api'
const headers = {
  'Content-Type': 'application/json',
}

const resInterceptor = {
  onFulfill: (response: any) => {
    return response.data
  },
  onReject: (error: any) => {
    return Promise.reject(error)
  },
}

interface IRequestParams {
  method?: string
  url: string
  data?: unknown
  params?: unknown
  config?: any
}
// const token = useAuthStore.getState().token

export class NetworkService {
  private client
  constructor() {
    this.client = axios.create({ baseURL: apiUrl, headers })
    this.client.interceptors.response.use(resInterceptor.onFulfill, resInterceptor.onReject)
  }

  setBaseUrl(url: string) {
    this.client.defaults.baseURL = url
  }

  setAccessToken(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token || useAuthStore.getState().token}`
  }

  setHeaderIpAddress(ipAddress: string) {
    this.client.defaults.headers.common.requestIp = ipAddress
  }

  setHeaderDeviceName(deviceName: string) {
    this.client.defaults.headers.common.deviceName = deviceName
  }

  setHeaderDeviceToken(deviceToken: string) {
    this.client.defaults.headers.common.deviceToken = deviceToken
  }

  setHeaderDeviceVersion(deviceVersion: string) {
    this.client.defaults.headers.common.deviceVersion = deviceVersion
  }

  clearAccessToken() {
    delete this.client.defaults.headers.common.authorization
  }

  request({ method, url, data, ...config }: IRequestParams) {
    return this.client.request({ method, url, data, ...config })
  }

  get({ url, config }: IRequestParams): any {
    this.setAccessToken(useAuthStore.getState().token)
    return this.client.get(url, {
      ...config,
    })
  }

  post({ url, data, config }: IRequestParams): Promise<any> {
    this.setAccessToken(useAuthStore.getState().token)
    return this.client.post(url, data, { ...config })
  }

  put({ url, data, config }: IRequestParams): Promise<any> {
    this.setAccessToken(useAuthStore.getState().token)
    return this.client.put(url, data, { ...config })
  }
}

export const networkService = new NetworkService()
