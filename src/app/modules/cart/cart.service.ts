/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TCartItem } from './cart.interface'
import { Cart } from './cart.model'
import { Types } from 'mongoose'

const addToCart = async (userId: string, item: TCartItem) => {
  let cart = await Cart.findOne({ userId })
  if (!cart) {
    cart = new Cart({ userId, items: [] })
  }

  const existingItemIndex = cart.items.findIndex(
    (i) => i.productId === item.productId,
  )

  if (existingItemIndex !== -1) {
    // Update quantity if item already exists in cart
    cart.items[existingItemIndex].quantity += item.quantity
  } else {
    // Add new item to cart
    cart.items.push(item)
  }

  return await cart.save()
}

const getCartByUserId = async (userId: string) => {
  const result = await Cart.findOne({ userId })
    .populate('items.productId')
    .exec()
  return result
}

const updateCartItemQuantity = async (
  userId: string,
  item: Partial<TCartItem>,
) => {
  const cart = await Cart.findOne({ userId })

  if (!cart) {
    throw new Error('Cart not found')
  }

  const { ...cartData } = item

  const result = await Cart.findByIdAndUpdate(userId, cartData, {
    new: true,
    runValidators: true,
  })
  return result
}

const clearCart = async (userId: string) => {
  const result = await Cart.deleteOne({ userId })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error clearing Cart!')
  }

  return result
}

const removeCartItem = async (userId: string, productId: Types.ObjectId) => {
  const cart = await Cart.findOne({ userId })

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found')
  }

  cart.items = cart.items.filter((item) => item.productId !== productId)
  const result = await cart.save()

  return result
}

export const CartServices = {
  addToCart,
  getCartByUserId,
  updateCartItemQuantity,
  clearCart,
  removeCartItem,
}
