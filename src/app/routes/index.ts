import { Router } from 'express'
import { userRoutes } from '../modules/users/user.router'
import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { SellerRoutes } from '../modules/seller/seller.route'

const router = Router()

const moduleRoutes = [
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
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
