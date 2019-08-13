export interface User {
  _id?: string
  email?: string
  password?: string
  name?: string
  lastname?: string
  views?: number
  rating?: number
  avatar?: string
  city?: string
  region?: string
  nickname?: string
  sex?: string
  coins?: Number
  notificationCount?: Number
}

export interface Login {
  token: string
  userId: string
}

export interface Photo {
  _id?: string,
  userId?: string
  photo?: string
  views?: number
  likes?: number
  stars?: number
  superLikes?: number
}

export interface RatingParams {
  skip?: number
  limit?: number
  region?: string
  sex?: string
}
interface Notification {
  _id: string
  type: string
  date: Date
}
export interface SuperLike extends Notification {
  photoSrc: string
  initiatorId: string
  photoId: string
}