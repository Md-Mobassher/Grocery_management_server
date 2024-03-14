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
  bloodGroup?: TBloodGroup
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  isDeleted: boolean
}

export interface AdminModel extends Model<TAdmin> {
  isAdminExistsById(id: string): Promise<TAdmin | null>
  isUserExistsByEmail(email: string): Promise<TAdmin | null>
}
