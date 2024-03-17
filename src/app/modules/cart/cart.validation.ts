import { z } from 'zod'

const CartItemValidationSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
})

export const CartValidationSchema = z.object({
  items: z.array(CartItemValidationSchema),
})

export const CartValidation = {
  CartItemValidationSchema,
  CartValidationSchema,
}
