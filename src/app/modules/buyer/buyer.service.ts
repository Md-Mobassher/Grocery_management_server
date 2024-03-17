/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { BuyerSearchableFields } from './buyer.constant'
import { User } from '../users/user.model'
import { Buyer } from './buyer.model'
import { TBuyer } from './buyer.interface'

const getAllBuyersFromDB = async (query: Record<string, unknown>) => {
  const buyerQuery = new QueryBuilder(Buyer.find(), query)
    .search(BuyerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await buyerQuery.modelQuery
  const meta = await buyerQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleBuyerFromDB = async (id: string) => {
  const result = await Buyer.findById(id)
  return result
}

const updateBuyerIntoDB = async (id: string, payload: Partial<TBuyer>) => {
  const { name, ...remainingData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Buyer.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBuyerFromDB = async (id: string | undefined) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isBuyerExists = await Buyer.findById(id).session(session)

    if (!isBuyerExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Buyer not found')
    }

    const deletedBuyer = await Buyer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedBuyer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Buyer')
    }

    // get user _id from deletedSeller
    const userId = deletedBuyer.user

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

    return deletedBuyer
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const BuyerServices = {
  getAllBuyersFromDB,
  getSingleBuyerFromDB,
  updateBuyerIntoDB,
  deleteBuyerFromDB,
}
