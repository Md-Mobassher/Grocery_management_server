import mongoose, { Schema } from 'mongoose'
import { TCart, TCartItem } from './cart.interface'

export const cartItemSchema = new Schema<TCartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: {
    type: Number,
    required: true,
  },
})

const cartSchema = new Schema<TCart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
  },
  { timestamps: true },
)

export const Cart = mongoose.model<TCart>('Cart', cartSchema)
