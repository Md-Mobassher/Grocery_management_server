import { z } from 'zod'

export const DiscountSchema = z.object({
  percentage: z.number().positive().int(),
  startAt: z.date(),
  endAt: z.date(),
})

// Define schema for product
export const createProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive().int(),
  category: z.array(z.string()),
  imageUrl: z.array(z.string().url()),
  isActive: z.boolean(),
  tags: z.array(z.string()).optional(),
  discount: DiscountSchema.optional(),
  brand: z.string().optional(),
  ratingsAverage: z.number().optional(),
  ratingsQuantity: z.number().optional(),
})

export const updateProductValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  quantity: z.number().positive().int().optional(),
  category: z.array(z.string()).optional(),
  imageUrl: z.array(z.string().url()).optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  discount: DiscountSchema.optional(),
  brand: z.string().optional(),
  ratingsAverage: z.number().optional(),
  ratingsQuantity: z.number().optional(),
})
