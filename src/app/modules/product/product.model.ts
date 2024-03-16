import { Schema, model } from 'mongoose'
import { TProduct } from './product.interface'

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  imageUrl: [{ type: String, required: true }],
  isActive: { type: Boolean, default: true },
  tags: [{ type: String }],
  discount: {
    percentage: { type: Number },
    startAt: { type: Date },
    endAt: { type: Date },
  },
  brand: { type: String },
  ratingsAverage: { type: Number },
  ratingsQuantity: { type: Number },
})

export const Product = model<TProduct>('Product', productSchema)
