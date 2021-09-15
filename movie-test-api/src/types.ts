export interface RegisterResponse extends UserInfo {}

export interface LoginResponse {
  token: string
}

export interface UserInfo {
  id: string
  username: string
}

export interface Context {
  userInfo: UserInfo
}

export interface MovieInfo {
  id: string
  name: string
  releaseDate: string
  duration: number
  actors: string
  rating: number
}
