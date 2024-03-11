import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.service'

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  })
})

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...adminData } = req.body
  const result = await AdminServices.updateAdminIntoDB(id, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params
  const result = await AdminServices.deleteAdminFromDB(adminId)

  if (result?.isDeleted === true) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is deleted succesfully',
      data: null,
    })
  }
})

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}
