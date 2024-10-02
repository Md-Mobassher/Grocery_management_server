/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TGender = 'male' | 'female' | 'other'
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-'

export type TUserName = {
  firstName: string
  lastName: string
}

export type TAddress = {
  address1: string
  address2?: string
  city: string
  state: string
  postCode: number
  country: string
}

export type TBuyer = {
  user: Types.ObjectId
  name: TUserName
  email: string
  password: string
  gender: TGender
  dateOfBirth: Date
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: TBloodGroup
  presentAddress: TAddress
  permanentAddress: TAddress
  profileImg?: string
  isDeleted: boolean
  fullName?: string
}

export interface BuyerModel extends Model<TBuyer> {
  // eslint-disable-next-line no-unused-vars
  isBuyerExistsByEmail(email: string): Promise<TBuyer | null>
  isBuyerExists(id: string): Promise<TBuyer | null>
}
