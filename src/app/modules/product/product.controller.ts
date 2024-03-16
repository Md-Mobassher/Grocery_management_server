import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './product.service'

const createProduct = catchAsync(async (req, res) => {
  const { ...productData } = req.body
  const result = await ProductServices.createProductIntoDB(
    req.file,
    productData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created succesfully!',
    data: result,
  })
})
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are retrieved succesfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.getSingleProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params
  const { ...sellerData } = req.body
  const result = await ProductServices.updateProductIntoDB(
    productId,
    sellerData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated succesfully.',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params
  const result = await ProductServices.deleteProductFromDB(productId)

  if (result?.isDeleted === true) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is deleted succesfully!',
      data: null,
    })
  }
})

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
