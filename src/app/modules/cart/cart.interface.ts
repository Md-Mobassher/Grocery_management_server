import { Types } from 'mongoose'

export type TCartItem = {
  productId: Types.ObjectId
  quantity: number
}

export type TCart = {
  userId: Types.ObjectId
  items: TCartItem[]
  createdAt: Date
  updatedAt: Date
}
