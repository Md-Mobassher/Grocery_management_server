import mongoose, { Schema, Types } from 'mongoose'
import { IOrder } from './order.interface'
import { PAYMENT_STATUS } from './order.constant'

const orderItemSchema = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
})

// Define the IOrder interface schema
const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      required: true,
    },
    transactionId: { type: String },
    paymentStatus: {
      type: String,
      required: true,
      default: PAYMENT_STATUS.UNPAID,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export const Order = mongoose.model<IOrder>('Order', orderSchema)
