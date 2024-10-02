import { Types } from 'mongoose'

export type TOrderItem = {
  productId: Types.ObjectId
  quantity: number
  totalPrice: number
}

export interface IOrder {
  _id: string
  userId: Types.ObjectId // Reference to User model
  items: TOrderItem[] // Array of items in the order
  totalAmount: number // Total amount of the order
  transactionId?: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'unpaid'
  createdAt: Date
  updatedAt: Date
}
