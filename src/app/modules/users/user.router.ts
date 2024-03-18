import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { UserControllers } from './user.controller'
import { USER_ROLE } from './user.constant'
import auth from '../../middlewares/auth'
import { upload } from '../../utils/sendImageToCloudinary'
import { UserValidation } from './user.validation'
import { createSellerValidationSchema } from '../seller/seller.validation'
import { createBuyerValidationSchema } from '../buyer/buyer.validation'

const router = express.Router()

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.post(
  '/create-seller',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createSellerValidationSchema),
  UserControllers.createSeller,
)

router.post(
  '/create-buyer',

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createBuyerValidationSchema),
  UserControllers.createBuyer,
)

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
)

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.buyer,
    USER_ROLE.seller,
  ),
  UserControllers.getMe,
)

export const userRoutes = router
