import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CategoryServices } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const { ...categoryData } = req.body

  const result = await CategoryServices.createCategoryIntoDB(categoryData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is created succesfully!',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories are retrieved succesfully!',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CategoryServices.getSingleCategoryFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is retrieved succesfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const { ...categoryData } = req.body
  const result = await CategoryServices.updateCategoryIntoDB(
    categoryId,
    categoryData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated succesfully.',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const result = await CategoryServices.deleteCategoryFromDB(categoryId)

  if (result?.isDeleted === true) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category is deleted succesfully!',
      data: null,
    })
  }
})

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}
