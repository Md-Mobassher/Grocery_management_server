/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TCategory } from './category.interface'
import { Category } from './category.model'
import { CategorySearchableFields } from './category.constant'

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = Category.create(payload)
  return result
}

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const CategoryQuery = new QueryBuilder(Category.find(), query)
    .search(CategorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await CategoryQuery.modelQuery
  const meta = await CategoryQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!')
  }

  if (result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is Deleted!')
  }

  return result
}

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const { ...categoryData } = payload

  const result = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  })
  return result
}

const softDeleteCategoryFromDB = async (id: string | undefined) => {
  const isCategoryExists = await Category.findById(id)

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!')
  }
  if (isCategoryExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is Already Deleted!')
  }

  const result = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )

  return result
}

const deleteCategoryFromDB = async (id: string | undefined) => {
  const isCategoryExists = await Category.findById(id)

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!')
  }
  if (isCategoryExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is Already Deleted!')
  }

  const result = await Category.findByIdAndDelete(id)

  return result
}

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  softDeleteCategoryFromDB,
  deleteCategoryFromDB,
}
