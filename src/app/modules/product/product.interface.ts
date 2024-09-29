import { Model, Types } from 'mongoose'

export interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  quantity: number
  category: Types.ObjectId[]
  imageUrl: string[]
  isActive: boolean
  isDeleted?: boolean
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

export interface ProductModel extends Model<IProduct> {
  //instance methods for checking if the user exist
  // eslint-disable-next-line no-unused-vars
  isProductExist(id: string): Promise<IProduct | null>
}
