/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { SellerSearchableFields } from './seller.constant'
import { User } from '../users/user.model'
import { Seller } from './seller.model'
import { TSeller } from './seller.interface'

const getAllSellersFromDB = async (query: Record<string, unknown>) => {
  const sellerQuery = new QueryBuilder(Seller.find(), query)
    .search(SellerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await sellerQuery.modelQuery
  const meta = await sellerQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleSellerFromDB = async (id: string) => {
  const result = await Seller.findById(id)
  return result
}

const updateSellerIntoDB = async (id: string, payload: Partial<TSeller>) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Seller.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteSellerFromDB = async (id: string | undefined) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isSellerExists = await Seller.findById(id).session(session)

    if (!isSellerExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Seller not found')
    }

    const deletedSeller = await Seller.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedSeller) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Seller')
    }

    // get user _id from deletedSeller
    const userId = deletedSeller.user

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedSeller
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const SellerServices = {
  getAllSellersFromDB,
  getSingleSellerFromDB,
  updateSellerIntoDB,
  deleteSellerFromDB,
}
