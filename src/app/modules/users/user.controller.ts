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

// const createUser = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body

//   const result = await UserServices.createAdminIntoDB(password, adminData)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin is created succesfully',
//     data: result,
//   })
// })

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
  // createUser,
  getMe,
  changeStatus,
}
