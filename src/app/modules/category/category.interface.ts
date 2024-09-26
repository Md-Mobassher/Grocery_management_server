/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TCategory = {
  name: string
  slug: string
  imageUrl: string
  description?: string
  isActive: boolean
  isDeleted: boolean
}

export interface CategoryModel extends Model<TCategory> {
  //instance methods for checking if the user exist
  isCategoryExist(id: string): Promise<TCategory | null>
}
