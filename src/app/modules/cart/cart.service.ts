/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TCartItem } from './cart.interface'
import { Cart } from './cart.model'
import { Types } from 'mongoose'
import { Product } from '../product/product.model'

const addToCart = async (userId: string, items: TCartItem[]) => {
  let cart = await Cart.findOne({ userId })

  if (!cart) {
    cart = new Cart({ userId, items: [] })
  }

  for (const item of items) {
    const isProductExist = await Product.findById(item.productId)

    if (!isProductExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
    }

    const existingItem = cart.items.find((i) =>
      i.productId.equals(item.productId),
    )

    if (existingItem) {
      // Update quantity if item already exists in cart
      existingItem.quantity += item.quantity
    } else {
      // Add new item to cart
      cart.items.push(item)
    }
  }

  const result = await cart.save()
  return result
}

const getCartByUserId = async (userId: string) => {
  const result = await Cart.findOne({ userId })
    .populate('items.productId')
    .exec()

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No cart found')
  }
  return result
}

const updateCartItemQuantity = async (
  userId: Types.ObjectId,
  productId: Types.ObjectId | string,
  quantity: number,
) => {
  const cart = await Cart.findOne({ userId })

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found')
  }

  const existingItem = cart.items.find((i) => i.productId.equals(productId))

  if (!existingItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found in cart')
  }

  existingItem.quantity = quantity

  const result = await cart.save()
  return result
}

const clearCart = async (userId: string) => {
  const result = await Cart.deleteOne({ userId })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error clearing Cart!')
  }

  return result
}

const removeCartItem = async (
  userId: string,
  productId: Types.ObjectId | string,
) => {
  const cart = await Cart.findOne({ userId })

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found')
  }

  const filteredItems = cart.items.filter(
    (item) => String(item.productId) !== productId,
  )

  cart.items = filteredItems
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
