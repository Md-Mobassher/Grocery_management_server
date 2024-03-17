import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { BuyerControllers } from './buyer.controller'
import { USER_ROLE } from '../users/user.constant'
import { updateBuyerValidationSchema } from './buyer.validation'

const router = express.Router()

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.seller),
  BuyerControllers.getAllBuyers,
)

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.seller),
  BuyerControllers.getSingleBuyer,
)

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateBuyerValidationSchema),
  BuyerControllers.updateBuyer,
)

router.delete(
  '/:sellerId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  BuyerControllers.deleteBuyer,
)

export const BuyerRoutes = router
