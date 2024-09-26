import { Schema, model } from 'mongoose'
import { TCategory } from './category.interface'

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

categorySchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } })
  next()
})

categorySchema.statics.isCategoryExist = async function (id: string) {
  return await Category.find({ id })
}

export const Category = model<TCategory>('Category', categorySchema)
