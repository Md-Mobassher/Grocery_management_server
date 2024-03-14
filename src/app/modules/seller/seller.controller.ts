import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SellerServices } from './seller.service'

const getAllSellers = catchAsync(async (req, res) => {
  const result = await SellerServices.getAllSellersFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sellers are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleSeller = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SellerServices.getSingleSellerFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is retrieved succesfully',
    data: result,
  })
})

const updateSeller = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...sellerData } = req.body
  const result = await SellerServices.updateSellerIntoDB(id, sellerData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is updated succesfully',
    data: result,
  })
})

const deleteSeller = catchAsync(async (req, res) => {
  const { sellerId } = req.params
  const result = await SellerServices.deleteSellerFromDB(sellerId)

  if (result?.isDeleted === true) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Seller is deleted succesfully',
      data: null,
    })
  }
})

export const SellerControllers = {
  getAllSellers,
  getSingleSeller,
  updateSeller,
  deleteSeller,
}
