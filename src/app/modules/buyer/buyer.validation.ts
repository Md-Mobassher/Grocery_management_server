import { z } from 'zod'
import { BloodGroup, Gender } from './buyer.constant'

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
})

export const createBuyerValidationSchema = z.object({
  name: createUserNameValidationSchema,
  email: z.string().email(),
  password: z.string().max(20),
  gender: z.enum([...Gender] as [string, ...string[]]),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
})

export const updateBuyerValidationSchema = z
  .object({
    user: z.string().optional(),
    name: updateUserNameValidationSchema.optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    email: z.string().email(),
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

export const SellerValidations = {
  createBuyerValidationSchema,
  updateBuyerValidationSchema,
}
