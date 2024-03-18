import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../users/user.constant'
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from './product.validation'
import { ProductControllers } from './product.controller'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  upload.array('files', 5),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createProductValidationSchema),
  ProductControllers.createProduct,
)

router.get(
  '/',

  ProductControllers.getAllProducts,
)

router.get(
  '/:id',

  ProductControllers.getSingleProduct,
)

router.patch(
  '/:productId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateProductValidationSchema),
  ProductControllers.updateProduct,
)

router.delete(
  '/:productId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.deleteProduct,
)

export const ProductRoutes = router
