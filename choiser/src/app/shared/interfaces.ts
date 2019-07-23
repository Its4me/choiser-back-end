export interface User {
  _id?: string,
  email?: string,
  password?: string,
  name?: string,
  lastname?: string,
  views?: number,
  rating?: number,
  avatar?: string,
  city?: string,
  region?: string,
  nickname?: string,
  sex?: string
}

export interface Login {
  token: string,
  userId: string
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
export interface Photo {
  _id?: string,
  userId?: string
  photo?: string
  views?: number
  likes?: number
  stars?: number
}

export interface RatingParams {
  skip?: number,
  limit?: number
  region?: string
  sex?: string
}