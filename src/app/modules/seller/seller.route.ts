import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { SellerControllers } from './seller.controller'
import { USER_ROLE } from '../users/user.constant'
import { updateSellerValidationSchema } from './seller.validation'

const router = express.Router()

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SellerControllers.getAllSellers,
)

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SellerControllers.getSingleSeller,
)

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateSellerValidationSchema),
  SellerControllers.updateSeller,
)

router.delete(
  '/:sellerId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SellerControllers.deleteSeller,
)

export const SellerRoutes = router
