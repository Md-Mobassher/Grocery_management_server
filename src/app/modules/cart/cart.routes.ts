import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CartControllers } from './cart.controller'
import { CartValidation } from './cart.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../users/user.constant'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.buyer),
  validateRequest(CartValidation.CartValidationSchema),
  CartControllers.addToCart,
)

router.get('/', auth(USER_ROLE.buyer), CartControllers.getCartByUserId)

router.put(
  '/:itemId',
  auth(USER_ROLE.buyer),
  CartControllers.updateCartItemQuantity,
)

router.delete('/', auth(USER_ROLE.buyer), CartControllers.clearCart)

router.delete('/:itemId', auth(USER_ROLE.buyer), CartControllers.removeCartItem)

export const CartRoutes = router
