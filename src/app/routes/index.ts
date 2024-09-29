import { Router } from 'express'
import { userRoutes } from '../modules/users/user.router'
import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { SellerRoutes } from '../modules/seller/seller.routes'
import { ProductRoutes } from '../modules/product/product.routes'
import { CategoryRoutes } from '../modules/category/category.routes'
import { CartRoutes } from '../modules/cart/cart.routes'
import { BuyerRoutes } from '../modules/buyer/buyer.routes'
import { PaymentRoutes } from '../modules/payment/payment.routes'
import { OrderRoutes } from '../modules/order/order.routes'

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
    path: '/buyers',
    route: BuyerRoutes,
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
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
