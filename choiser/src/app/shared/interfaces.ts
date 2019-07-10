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
export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?():void
}

export interface MaterialSlider extends  MaterialInstance{
  next?(): void
  prev?(): void
}