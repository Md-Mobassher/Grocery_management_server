import { z } from 'zod'
import { BloodGroup, Gender } from './seller.constant'

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
})

export const createSellerValidationSchema = z.object({
  name: createUserNameValidationSchema,
  email: z.string().email(),
  password: z.string().max(20),
  companyName: z.string(),
  ownerName: z.string(),
  designation: z.string(),
  gender: z.enum([...Gender] as [string, ...string[]]),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
})

export const updateSellerValidationSchema = z
  .object({
    user: z.string().optional(),
    registrationNumber: z.string().optional(),
    ownerName: updateUserNameValidationSchema,
    companyName: z.string().optional(),
    email: z.string().email().optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.date().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
    isDeleted: z.boolean().optional(),
  })
  .partial()

export const AdminValidations = {
  createSellerValidationSchema,
  updateSellerValidationSchema,
}
