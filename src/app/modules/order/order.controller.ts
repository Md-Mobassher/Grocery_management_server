import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OrderServices } from './order.service'
import AppError from '../../errors/AppError'

const createOrder = catchAsync(async (req, res) => {
  const user = req.user
  const result = await OrderServices.createOrder(user, req.body)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created succesfully!',
    data: result,
  })
})

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrders(req.query)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved succesfully!',
    data: result,
  })
})

const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params
  const result = await OrderServices.getSingleOrder(orderId as string)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved succesfully!',
    data: result,
  })
})

const cancelOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params
  const result = await OrderServices.cancelOrder(orderId)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order canceled succesfully!',
    data: result,
  })
})

const changeOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params

  const result = await OrderServices.changeOrderStatus(orderId, req.body)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status changed succesfully!',
    data: result,
  })
})

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  cancelOrder,
  changeOrderStatus,
}
