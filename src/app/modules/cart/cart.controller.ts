import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CartServices } from './cart.service'
import { Types } from 'mongoose'

const addToCart = catchAsync(async (req, res) => {
  const userId = req.user.id
  const items = req.body.items

  const result = await CartServices.addToCart(userId, items)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item added to Cart!',
    data: result,
  })
})

const getCartByUserId = catchAsync(async (req, res) => {
  const { id } = req.user
  const result = await CartServices.getCartByUserId(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved succesfully!',
    data: result,
  })
})

const updateCartItemQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id
  const productId: Types.ObjectId | string = req.params.itemId
  const quantity = req.body.quantity

  const result = await CartServices.updateCartItemQuantity(
    userId,
    productId,
    quantity,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated succesfully.',
    data: result,
  })
})

const clearCart = catchAsync(async (req, res) => {
  const userId = req.user.id
  const result = await CartServices.clearCart(userId)

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cart is deleted succesfully!',
      data: null,
    })
  }
})

const removeCartItem = catchAsync(async (req, res) => {
  const userId = req.user.id
  const productId: Types.ObjectId | string = req.params.itemId
  const result = await CartServices.removeCartItem(userId, productId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item removed from Cart.',
    data: result,
  })
})

export const CartControllers = {
  addToCart,
  getCartByUserId,
  updateCartItemQuantity,
  clearCart,
  removeCartItem,
}
