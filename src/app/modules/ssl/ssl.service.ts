import axios from 'axios'
import config from '../../config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { PaymentInfo } from './ssl.interface'

const initPayment = async (paymentData: PaymentInfo) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: paymentData.totalAmount,
      currency: 'BDT',
      tran_id: paymentData.transactionId,
      success_url: config.ssl.successUrl,
      fail_url: config.ssl.failUrl,
      cancel_url: config.ssl.calcelUrl,
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: paymentData.productName,
      product_category: paymentData.productCategory,
      product_profile: 'general',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.cusAdd1,
      cus_add2: paymentData.cusAdd2,
      cus_city: paymentData.cusCity,
      cus_state: paymentData.cusState,
      cus_postcode: paymentData.cusPostcode,
      cus_country: paymentData.cusCountry,
      cus_phone: paymentData.cusPhone,
      cus_fax: paymentData.cusFax || '01000000000',
      ship_name: paymentData.shipName,
      ship_add1: paymentData.shipAdd1,
      ship_add2: paymentData.shipAdd1,
      ship_city: paymentData.shipCity,
      ship_state: paymentData.shipState,
      ship_postcode: paymentData.shipPostcode,
      ship_country: paymentData.shipCountry,
    }

    const response = await axios({
      method: 'post',
      url: config.ssl.paymentApi,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return response.data
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment Error')
  }
}

export const sslServices = {
  initPayment,
}
