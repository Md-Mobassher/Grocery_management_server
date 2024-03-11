import { z } from 'zod'
import { BloodGroup, Gender } from './admin.constant'

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
})

export const createAdminValidationSchema = z.object({
  name: createUserNameValidationSchema,
  email: z.string(),
  password: z.string().max(20),
  designation: z.string(),
  gender: z.enum([...Gender] as [string, ...string[]]),
  dateOfBirth: z.string().optional(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
})

export const updateAdminValidationSchema = z.object({
  name: updateUserNameValidationSchema.optional(),
  email: z.string().optional(),
  designation: z.string().max(30).optional(),
  gender: z.enum([...Gender] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImg: z.string().optional(),
})

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
}
