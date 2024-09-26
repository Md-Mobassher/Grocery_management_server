import { z } from 'zod'

const createCategoryValidationSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  imageUrl: z.string(),
  description: z.string().optional(),
})
const updateCategoryValidationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).optional(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
})

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
}
