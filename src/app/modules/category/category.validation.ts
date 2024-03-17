import { z } from 'zod'

const createCategoryValidationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
})
const updateCategoryValidationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
})

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
}
