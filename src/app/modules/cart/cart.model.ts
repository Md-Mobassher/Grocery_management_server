import mongoose, { Schema } from 'mongoose'
import { TCart, TCartItem } from './cart.interface'

const cartItemSchema = new Schema<TCartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
})

const cartSchema = new Schema<TCart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
  },
  { timestamps: true },
)

export const Cart = mongoose.model<TCart>('Cart', cartSchema)
