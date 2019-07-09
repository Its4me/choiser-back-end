export interface User {
  email: string,
  password: string,
  name: string,
  lastname: string,
  views: number,
  rating: number,
  avatar: string,
  city: string,
  region: string,
  nickname: string,
}

export interface Login {
  token: string,
  _id: string
}