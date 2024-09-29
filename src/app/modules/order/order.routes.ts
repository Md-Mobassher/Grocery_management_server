import express from 'express'
import { OrderController } from './order.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../users/user.constant'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.buyer),
  OrderController.createOrder,
)
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderController.getAllOrders,
)
router.get(
  '/:orderId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderController.getSingleOrder,
)
router.patch('/:orderId', auth(USER_ROLE.buyer), OrderController.cancelOrder)

router.put(
  '/change-status/:orderId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OrderController.changeOrderStatus,
)

export const OrderRoutes = router
