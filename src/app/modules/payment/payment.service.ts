import { Order } from '../order/order.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { PAYMENT_STATUS } from '../order/order.constant'
import { sslServices } from '../ssl/ssl.service'
import { Buyer } from '../buyer/buyer.model'

const initPayment = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('userId')
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Order found')
  }

  const customerInfo = await Buyer.isBuyerExistsByEmail(order?.userId?.email)

  const transactionId = `TxId${Date.now()}-${Math.floor(
    Math.random() * 100000,
  )}`

  order.transactionId = transactionId
  await order.save()

  if (order.paymentStatus === PAYMENT_STATUS.PAID) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You already pay for the appointment!',
    )
  }

  const paymentSession = await sslServices.initPayment({
    totalAmount: order.totalAmount,
    transactionId: order.transactionId,
    productName: order.items.forEach((item) => item.productId),
    customerName: order.items.forEach((item) => item.productId),
    customerCategory: customerInfo?.fullName as string,
    customerEmail: customerInfo?.email as string,
    cusAdd1: customerInfo?.presentAddress?.address1,
    cusAdd2: customerInfo?.presentAddress?.address2,
    cusCity: customerInfo?.presentAddress?.city,
    cusState: customerInfo?.presentAddress?.state,
    cusPostcode: customerInfo?.presentAddress?.postCode,
  })
  return {
    paymentUrl: paymentSession.GatewayPageURL,
  }
}

export const PaymentServices = {
  initPayment,
}
