import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BuyerServices } from './buyer.service'

const getAllBuyers = catchAsync(async (req, res) => {
  const result = await BuyerServices.getAllBuyersFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyers are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleBuyer = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BuyerServices.getSingleBuyerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer is retrieved succesfully',
    data: result,
  })
})

const updateBuyer = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...buyerData } = req.body
  const result = await BuyerServices.updateBuyerIntoDB(id, buyerData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer is updated succesfully',
    data: result,
  })
})

const deleteBuyer = catchAsync(async (req, res) => {
  const { buyerId } = req.params
  const result = await BuyerServices.deleteBuyerFromDB(buyerId)

  if (result?.isDeleted === true) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Buyer is deleted succesfully',
      data: null,
    })
  }
})

export const BuyerControllers = {
  getAllBuyers,
  getSingleBuyer,
  updateBuyer,
  deleteBuyer,
}
