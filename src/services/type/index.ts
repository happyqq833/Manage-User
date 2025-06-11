export type CommonObject = {
  id?: number | null
  code?: number | null
  name?: string | null
}

export type BaseResponse<T> = {
  message: string
  traceId: string
  data: T
}

export type PageContent<T> = {
  content: T
  page: number
  size: number
  sort: string
  totalElements: number
  totalPages: number
  numberOfElements: number
}

export type PageResponse<T> = {
  message: string
  traceId: string
  data: PageContent<T>
  errorCodes?: {
    code: string
    message: string
  }[]
}
