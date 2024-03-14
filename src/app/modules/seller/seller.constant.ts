import { TBloodGroup, TGender } from './seller.interface'

export const Gender: TGender[] = ['male', 'female', 'other']

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]

export const SellerSearchableFields = [
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
  'companyName',
]
