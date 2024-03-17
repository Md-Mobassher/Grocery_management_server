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
  middleName: string
  lastName: string
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
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  isDeleted: boolean
}

export interface BuyerModel extends Model<TBuyer> {
  // eslint-disable-next-line no-unused-vars
  isBuyerExistsByEmail(email: string): Promise<TBuyer | null>
}
