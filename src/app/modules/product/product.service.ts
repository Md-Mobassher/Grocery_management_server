/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Product } from './product.model'
import { ProductSearchableFields } from './product.constant'
import { TProduct } from './product.interface'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'

const createProductIntoDB = async (files: any[], payload: TProduct) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Array to store Cloudinary URLs for each uploaded file
    const cloudinaryUrls: string[] = []

    // Iterate over each uploaded file
    for (const file of files) {
      const imageName = `${payload.name}-${Date.now()}`

      const path = file.path
      // Send image to Cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      cloudinaryUrls.push(secure_url as string)
    }

    // Initialize imageUrl array if it's undefined
    payload.imageUrl = payload?.imageUrl || []

    // Append Cloudinary URLs to imageUrl array in payload
    payload.imageUrl = payload.imageUrl.concat(cloudinaryUrls)

    // Create a Product
    const newProduct = await Product.create([payload], { session })

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

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
  }

  if (result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is Deleted!')
  }

  return result
}

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const { ...remaininProductData } = payload

  const result = await Product.findByIdAndUpdate(id, remaininProductData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteProductFromDB = async (id: string | undefined) => {
  const isProductExists = await Product.findById(id)

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
  }
  if (isProductExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is Already Deleted!')
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )

  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
