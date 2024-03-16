/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Product } from './product.model'
import { ProductSearchableFields } from './product.constant'
import { TProduct } from './product.interface'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'

const createProductIntoDB = async (file: any, payload: TProduct) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (file) {
      const imageName = `${payload?.name}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload?.imageUrl?.push(secure_url as string)
    }
    console.log(payload)
    // create a Product
    const newProduct = await Product.create([payload], { session })
    console.log(newProduct)
    //create a admin
    if (!newProduct.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Product')
    }

    await session.commitTransaction()
    await session.endSession()

    return newProduct
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await productQuery.modelQuery
  const meta = await productQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
  return result
}

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Product.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProductFromDB = async (id: string | undefined) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isProductExists = await Product.findById(id).session(session)

    if (!isProductExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    }
    if (isProductExists.isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product is Already Deleted!')
    }

    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Seller')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedProduct
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
