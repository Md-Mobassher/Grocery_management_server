import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: {
    live: process.env.DATABASE_URL,
    local: process.env.DATABASE_URL_LOCAL,
  },

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  super_admin_password: process.env.SUPER_ADMIN_PASS,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,

  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },

  ssl: {
    storeId: process.env.STORE_ID,
    storePass: process.env.STORE_PASS,
    successUrl: process.env.SUCCESS_URL,
    calcelUrl: process.env.CANCEL_URL,
    failUrl: process.env.FAIL_URL,
    paymentApi: process.env.SSL_PAYMENT_API,
    validationApi: process.env.SSL_VALIDATION_API,
  },
}
