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

export type TAdmin = {
  user: Types.ObjectId
  designation: string
  name: TUserName
  email: string
  gender: TGender
  dateOfBirth: Date
  contactNo: string
  emergencyContactNo: string
  bloogGroup?: TBloodGroup
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  isDeleted: boolean
}

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<TAdmin | null>
}
