declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number
    DATABASE_URL_LOCAL: string
    DATABASE_URL: string
    NODE_ENV: string
    BCRYPT_SALT_ROUNDS: number
    DEFAULT_PASSWORD: string
    DEFAULT_PASS: string
    JWT_ACCESS_SECRET: string
    JWT_REFRESH_SECRET: string
    JWT_ACCESS_EXPIRES_IN: string
    JWT_REFRESH_EXPIRES_IN: string
    RESET_PASS_UI_LINK: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    SUPER_ADMIN_PASS: string
  }
}
