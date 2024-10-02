import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Product } from '../product/product.model'
import { OrderSearchableFields } from './order.constant'
import { IOrder } from './order.interface'
import { Order } from './order.model'
import { User } from '../users/user.model'
import { JwtPayload } from 'jsonwebtoken'

const createOrder = async (user: JwtPayload, payload: IOrder) => {
  const isUserExist = await User.isUserExistsById(user?.id)

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, `User not found`)
  }

  for (const item of payload.items) {
    const productExists = await Product.isProductExist(
      item.productId.toString(),
    )

    if (!productExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with ID ${item.productId} is not found`,
      )
    }

    // You could also check if the product has enough quantity here
    if (productExists.quantity < item.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Insufficient stock for product with ID ${item.productId}`,
      )
    }
  }
  payload.userId = user.id

  // Create the order if all products exist
  const result = await Order.create(payload)

  if (!result) {
    throw new AppError(404, 'Order creation failed')
  }

  return result
}

const getAllOrders = async (query: Record<string, unknown>) => {
  const OrderQuery = new QueryBuilder(Order.find(), query)
    .search(OrderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await OrderQuery.modelQuery
  const meta = await OrderQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id)

  return result
}

const cancelOrder = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    { _id: id },
    { status: 'cancel' },
    { new: true, runValidators: true },
  )

  return result
}

const changeOrderStatus = async (id: string, payload: Partial<IOrder>) => {
  const result = await Order.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  cancelOrder,
  changeOrderStatus,
}
