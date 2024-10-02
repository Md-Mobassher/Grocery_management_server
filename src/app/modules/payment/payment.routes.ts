import express from 'express'
import { PaymentController } from './payment.controller'
import { USER_ROLE } from '../users/user.constant'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/:orderId', auth(USER_ROLE.buyer), PaymentController.initPayment)

export const PaymentRoutes = router
