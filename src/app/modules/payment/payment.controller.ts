import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { PaymentServices } from './payment.service'

const initPayment = catchAsync(async (req, res) => {
  const { orderId } = req.params
  const result = await PaymentServices.initPayment(orderId as string)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initiated succesfully!',
    data: result,
  })
})

export const PaymentController = {
  initPayment,
}
