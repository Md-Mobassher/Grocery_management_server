export const OrderSearchableFields = ['name']

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const PAYMENT_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
}
