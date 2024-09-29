/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface IUser {
  _id?: Types.ObjectId
  email: string
  password: string
  needsPasswordChange?: boolean
  passwordChangedAt?: Date
  role: 'superAdmin' | 'admin' | 'seller' | 'buyer'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<IUser | null>
  //instance methods for checking if the user exist
  isUserExistsById(id: string): Promise<IUser | null>

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
