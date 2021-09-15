export interface Movie {
  id: string

  name: string
  releaseDate: string
  duration: number
  actors: string
  rating: number | string | undefined
}

export interface RegisterResponse {
  id: string
  username: string
}

export interface LoginResponse {
  token: string
}

export interface UserInfo {
  password: string | undefined
  username: string | undefined
}
