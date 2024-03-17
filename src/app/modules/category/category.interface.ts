/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TCategory = {
  name: string
  description?: string
  isActive: boolean
}

export interface CategoryModel extends Model<TCategory> {
  //instance methods for checking if the user exist
  isCategoryExist(id: string): Promise<TCategory | null>
}
