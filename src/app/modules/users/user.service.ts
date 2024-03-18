/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from './user.model'
import mongoose from 'mongoose'
import { Admin } from '../admin/admin.model'
import { TAdmin } from '../admin/admin.interface'
import { IUser } from './user.interface'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { USER_ROLE } from './user.constant'
import { Seller } from '../seller/seller.model'
import { TSeller } from '../seller/seller.interface'
import { TBuyer } from '../buyer/buyer.interface'
import { Buyer } from '../buyer/buyer.model'

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //set role
  userData.role = USER_ROLE.admin

  userData.password = password

  //set admin email
  userData.email = payload?.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (file) {
      const imageName = `${payload?.name?.firstName}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set email, _id as user
    payload.email = newUser[0].email
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createSellerIntoDB = async (
  file: any,
  password: string,
  payload: TSeller,
) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //set seller role
  userData.role = USER_ROLE.seller

  userData.password = password

  //set admin email
  userData.email = payload?.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (file) {
      const imageName = `${payload?.name?.firstName}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a seller
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create seller')
    }
    // set email, _id as seller
    payload.email = newUser[0].email
    payload.user = newUser[0]._id //reference _id

    // create a seller (transaction-2)
    const newSeller = await Seller.create([payload], { session })

    if (!newSeller.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create seller')
    }

    await session.commitTransaction()
    await session.endSession()

    return newSeller
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createBuyerIntoDB = async (
  file: any,
  password: string,
  payload: TBuyer,
) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //set student role
  userData.role = 'buyer'

  userData.password = password

  //set admin email
  userData.email = payload?.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (file) {
      const imageName = `${payload?.name?.firstName}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User')
    }
    // set email, _id as user
    payload.email = newUser[0].email
    payload.user = newUser[0]._id

    // create a buyer (transaction-2)
    const newBuyer = await Buyer.create([payload], { session })

    if (!newBuyer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Buyer')
    }

    await session.commitTransaction()
    await session.endSession()

    return newBuyer
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getMe = async (userEmail: string, role: string) => {
  let result = null
  if (role === USER_ROLE.seller) {
    result = await User.findOne({ email: userEmail }).populate('seller')
  }
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ email: userEmail }).populate('admin')
  }
  if (role === USER_ROLE.buyer) {
    result = await User.findOne({ email: userEmail }).populate('buyer')
  }

  return result
}

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const UserServices = {
  createAdminIntoDB,
  createSellerIntoDB,
  createBuyerIntoDB,
  getMe,
  changeStatus,
}
