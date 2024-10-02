export interface PaymentInfo {
  totalAmount: number
  transactionId: string
  customerName: string
  customerEmail: string
  productName: string
  productCategory: string
  cusName: string
  cusEmail: string
  cusAdd1: string
  cusAdd2?: string
  cusCity: string
  cusState?: string
  cusPostcode: string
  cusCountry: string
  cusPhone: string
  cusFax?: string
  shipName?: string
  shipAdd1?: string
  shipAdd2?: string
  shipCity?: string
  shipState?: string
  shipPostcode?: number
  shipCountry: string
}
