import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createAdmin = catchAsync(async (req, res) => {
  const { password, ...adminData } = req.body
  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

const createSeller = catchAsync(async (req, res) => {
  const { password, ...sellerData } = req.body
  const result = await UserServices.createSellerIntoDB(
    req.file,
    password,
    sellerData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller is created succesfully',
    data: result,
  })
})

const createBuyer = catchAsync(async (req, res) => {
  const { password, ...buyerData } = req.body
  const result = await UserServices.createBuyerIntoDB(
    req.file,
    password,
    buyerData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer is created succesfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.body
  const result = await UserServices.getMe(email, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await UserServices.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  })
})

export const UserControllers = {
  createAdmin,
  createSeller,
  createBuyer,
  getMe,
  changeStatus,
}
