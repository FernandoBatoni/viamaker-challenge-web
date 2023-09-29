import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IPaginate<T> {
  [key: string]: {
    docs: T[]
    totalDocs: number
    limit: number
    page: number
    totalPages: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }
}

export interface IResponseBase<T> extends AxiosResponse {
  data: {
    status: string
    code: number
    success: boolean
    message?: string
    data?: T
  }
}

export interface ILabelAndValue <T> {
  label: string
  value: T
}

export type ILabelsAndValues <T> = ILabelAndValue<T>[]

export type IErrorForm<T> = { [Key in keyof T]?: string }

export class ErrInternetDisconnected extends Error {
  name = 'ERR_INTERNET_DISCONNECTED'
  message = 'Verifique sua conexão com a internet'
}

export class ConnectionFailed extends Error {
  name = 'CONNECTION_FAILED'
  message = 'Não foi possível se comunicar com o servidor'
}

export class RouteNotFound extends Error {
  name = 'NOT_FOUND'
  message = 'Rota não encontrada'
}

export interface IRepository {
  api: AxiosInstance
  path: string
}

export class Repository<Type, CreateType, GetType, UpdateType> {
  protected api: AxiosInstance
  protected path: string

  constructor ({ api, path }: IRepository) {
    this.api = api
    this.path = path
  }

  async handle <T = Type > (request: () => Promise<AxiosResponse>): Promise<IResponseBase<T>> {
    try {
      const response: AxiosResponse = await request()
      return response
    } catch (err) {
      if (axios.isCancel(err)) throw err
      if (err.name === 'ERR_INTERNET_DISCONNECTED') throw new ErrInternetDisconnected()
      if (!err.response) throw new ConnectionFailed()
      throw err.response.data
    }
  }

  async getAll<T = GetType | Type> (config?: AxiosRequestConfig): Promise<IResponseBase<T>> {
    return this.handle<T>(() =>
      this.api.get(this.path, config)
    )
  }

  async find<T = GetType | Type> (id: string, config?: AxiosRequestConfig): Promise<IResponseBase<{ [key: string]: T }>> {
    return this.handle<{ [key: string]: T }>(() =>
      this.api.get(`${this.path}/${id}`, config)
    )
  }

  async create<T = CreateType | Type> (data: T, config?: AxiosRequestConfig): Promise<IResponseBase<T>> {
    return this.handle(() =>
      this.api.post(`${this.path}`, data, config)
    )
  }

  async update<T = UpdateType | CreateType | Type> (id: string, data: T, config?: AxiosRequestConfig): Promise<IResponseBase<UpdateType>> {
    return this.handle(() =>
      this.api.patch(`${this.path}/update/${id}`, data, config)
    )
  }
}
