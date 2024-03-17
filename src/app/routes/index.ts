import { Router } from 'express'
import { userRoutes } from '../modules/users/user.router'
import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { SellerRoutes } from '../modules/seller/seller.routes'
import { ProductRoutes } from '../modules/product/product.routes'
import { CategoryRoutes } from '../modules/category/category.routes'
import { CartRoutes } from '../modules/cart/cart.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },

  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/sellers',
    route: SellerRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
