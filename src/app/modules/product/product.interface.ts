import { Types } from 'mongoose'

export type TProduct = {
  _id: string
  name: string
  description: string
  price: number
  quantity: number
  category: Types.ObjectId[]
  imageUrl: string[]
  isActive: boolean
  tags?: string[]
  discount?: {
    percentage: number
    startAt: Date
    endAt: Date
  }
  brand?: string
  ratingsAverage?: number
  ratingsQuantity?: number
}
