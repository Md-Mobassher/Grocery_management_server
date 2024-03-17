import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../users/user.constant'
import { CategoryValidation } from './category.validation'
import { CategoryControllers } from './category.controller'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory,
)

router.get('/', CategoryControllers.getAllCategories)

router.get('/:id', CategoryControllers.getSingleCategory)

router.patch(
  '/:categoryId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
)

router.delete(
  '/:categoryId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CategoryControllers.deleteCategory,
)

export const CategoryRoutes = router
