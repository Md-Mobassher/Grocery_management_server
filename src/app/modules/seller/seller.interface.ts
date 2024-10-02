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

export type TSeller = {
  user: Types.ObjectId
  name: TUserName
  email: string
  password: string
  companyName: string
  ownerName: string
  designation: string
  registrationNumber: string
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

export interface SellerModel extends Model<TSeller> {
  // eslint-disable-next-line no-unused-vars
  isSellerExistsByEmail(email: string): Promise<TSeller | null>
}
