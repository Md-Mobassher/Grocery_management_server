import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CategoryServices } from './category.service'
import AppError from '../../errors/AppError'

const createCategory = catchAsync(async (req, res) => {
  const { ...categoryData } = req.body

  const result = await CategoryServices.createCategoryIntoDB(categoryData)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is created succesfully!',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB(req.query)
  if (!result) {
    throw new AppError(404, 'No data found')
  }
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
  if (!result) {
    throw new AppError(404, 'No data found')
  }
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
  if (!result) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated succesfully.',
    data: result,
  })
})

const softDeleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const result = await CategoryServices.softDeleteCategoryFromDB(categoryId)
  if (!result?.isDeleted) {
    throw new AppError(404, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is deleted succesfully!',
    data: null,
  })
})
const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  await CategoryServices.deleteCategoryFromDB(categoryId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is deleted succesfully!',
    data: null,
  })
})

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  softDeleteCategory,
  deleteCategory,
}
